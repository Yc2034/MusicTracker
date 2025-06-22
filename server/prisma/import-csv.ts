// server/prisma/import-csv.ts

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

// 初始化 Prisma Client
const prisma = new PrismaClient();

// 定义CSV文件中每一行的数据结构
interface CsvRow {
  artist_name: string;
  song_title: string;
  streams: string; // 从CSV读取时通常是字符串
  record_date: string;
}

async function main() {
  console.log('Starting CSV data import...');

  const results: CsvRow[] = [];
  // CSV文件的路径，可以根据你的项目结构调整
  const csvFilePath = path.join('./src/scripts', 'songs.csv'); 

  // 1. 使用 stream 的方式读取和解析CSV文件
  // 这种方式对于大文件更高效，因为它不需要一次性把整个文件读入内存
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

  let createdCount = 0;

  // 2. 遍历从CSV中解析出的每一行数据
  for (const row of results) {
    if (!row.artist_name || !row.song_title) {
      console.warn('Skipping row due to missing artist name or song title:', row);
      continue;
    }

    try {
      // 3. 使用 upsert 查找或创建歌手
      // 这可以确保即使CSV中有重复的歌手名，数据库中也只有一个对应的记录
      const artist = await prisma.artist.upsert({
        where: { name: row.artist_name.toLowerCase() },
        update: {},
        create: {
          name: row.artist_name.toLowerCase(),
        },
      });

      // 4. 在该歌手下创建歌曲和播放记录
      // 我们使用 nested write (嵌套写入) 在一个操作中完成
      // 注意：这里我们没有检查歌曲是否已存在，如果需要，可以先查询再创建
      await prisma.song.create({
        data: {
          title: row.song_title,
          artistId: artist.id, // 关联到刚刚找到或创建的歌手
          stream_records: {
            create: {
              // 将字符串转换为 BigInt
              streams: BigInt(row.streams), 
              // 将字符串转换为 Date 对象
              record_date: new Date(row.record_date),
            },
          },
        },
      });

      createdCount++;
      console.log(`Successfully imported: ${row.artist_name} - ${row.song_title}`);

    } catch (error) {
      // 如果发生错误（例如，同一歌手下的歌曲已存在，违反了@@unique约束），则打印错误并继续
      console.error(`Error importing row: ${JSON.stringify(row)}. Error:`, error);
    }
  }

  console.log(`\nImport finished! Successfully created ${createdCount} song records.`);
}

// 执行 main 函数，并确保在完成后断开数据库连接
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
