import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as dotenv from 'dotenv'; 

dotenv.config();

// 初始化 Prisma Client
const prisma = new PrismaClient();

// 1. 更新 CsvRow 接口以匹配新的CSV文件列
interface CsvRow {
  artist_name: string;
  song_title: string;
  streams: string;
  record_date: string;
  is_liked: string; // CSV中布尔值通常读作 'true' 或 'false' 字符串
  release_date: string; // 可能为空
  live_event_date: string; // 可能为空
  live_event_location: string; // 可能为空
}

async function main() {
  console.log('Starting CSV data import...');

  const results: CsvRow[] = [];
  const csvFilePath = path.join('./src/scripts', 'songs.csv'); // 确认路径是否正确

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`Finished reading CSV file. Found ${results.length} records.`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  let processedCount = 0;

  for (const row of results) {
    if (!row.artist_name || !row.song_title || !row.streams) {
      console.warn('Skipping row due to missing essential data (artist, title, or streams):', row);
      continue;
    }

    try {
      // 使用 upsert 查找或创建歌手，确保不重复
      const artist = await prisma.artist.upsert({
        where: { name: row.artist_name },
        update: {},
        create: {
          name: row.artist_name,
        },
      });

      // 2. 改用 song.upsert 来创建或更新歌曲
      const song = await prisma.song.upsert({
        // 使用组合唯一索引来查找歌曲
        where: {
          artistId_title: {
            artistId: artist.id,
            title: row.song_title,
          },
        },
        // 如果歌曲已存在，执行更新操作：只为它添加一条新的播放记录
        update: {
          stream_records: {
            create: {
              streams: BigInt(row.streams),
              record_date: new Date(row.record_date),
            },
          },
        },
        // 如果歌曲不存在，执行创建操作
        create: {
          title: row.song_title,
          artistId: artist.id,
          // 3. 处理所有新字段的数据类型转换
          is_liked: row.is_liked === 'true', // 将 'true' 字符串转为布尔值
          // 如果日期字段为空字符串，则存为 null
          release_date: row.release_date ? new Date(row.release_date) : null,
          live_event_date: row.live_event_date ? new Date(row.live_event_date) : null,
          // 如果地点字段为空字符串，则存为 null
          live_event_location: row.live_event_location || null,
          // 嵌套创建第一条播放记录
          stream_records: {
            create: {
              streams: BigInt(row.streams),
              record_date: new Date(row.record_date),
            },
          },
        },
      });

      processedCount++;
      console.log(`Successfully processed: ${row.artist_name} - ${row.song_title}`);

    } catch (error) {
      console.error(`Error processing row: ${JSON.stringify(row)}. Error:`, error);
    }
  }

  console.log(`\nImport finished! Successfully processed ${processedCount} records.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });