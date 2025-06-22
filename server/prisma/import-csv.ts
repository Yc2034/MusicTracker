// prisma/import-csv.ts

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as dotenv from 'dotenv'; 

dotenv.config();

const prisma = new PrismaClient();

interface CsvRow {
  artist_name: string;
  song_title: string;
  streams: string;
  record_date: string;
  is_liked: string;
  release_date: string;
  live_event_date: string;
  live_event_location: string;
}

async function main() {

  // 1. 从命令行参数获取 "artist key" (例如 'olivia' 或 'weeknd')
  const artistKey = process.argv[2];

  if (!artistKey) {
    console.error('❌ 错误: 请提供一个 "artist key" 作为命令行参数。');
    console.log('    用法: npx prisma execute --file prisma/import-csv.ts -- <artist_key>');
    console.log('    示例: npx prisma execute --file prisma/import-csv.ts -- olivia');
    process.exit(1); // 以错误码退出程序
  }

  // 3. 根据 artist key 构建完整的文件名和路径
  const fileName = `songs-${artistKey}.csv`;
  const csvFilePath = path.join(__dirname, 'data', fileName); // 您的CSV文件存放目录

  console.log(`🚀 开始导入CSV数据: ${fileName}`);

  // --- 改动结束 ---

  const results: CsvRow[] = [];

  // 检查文件是否存在
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ 错误: 文件未找到 at ${csvFilePath}`);
    process.exit(1);
  }

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`  ✅ 完成读取CSV文件. 共找到 ${results.length} 条记录.`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  let processedCount = 0;
  let skippedCount = 0;

  for (const row of results) {
    if (!row.artist_name || !row.song_title || !row.streams) {
      console.warn('  ⚠️ 跳过不完整的行:', row);
      skippedCount++;
      continue;
    }

    try {
      const artist = await prisma.artist.upsert({
        where: { name: row.artist_name },
        update: {},
        create: { name: row.artist_name },
      });

      await prisma.song.upsert({
        where: {
          artistId_title: {
            artistId: artist.id,
            title: row.song_title,
          },
        },
        update: {
          stream_records: {
            create: {
              streams: BigInt(row.streams),
              record_date: new Date(row.record_date),
            },
          },
        },
        create: {
          title: row.song_title,
          artistId: artist.id,
          is_liked: row.is_liked === 'true',
          release_date: row.release_date ? new Date(row.release_date) : null,
          live_event_date: row.live_event_date ? new Date(row.live_event_date) : null,
          live_event_location: row.live_event_location || null,
          stream_records: {
            create: {
              streams: BigInt(row.streams),
              record_date: new Date(row.record_date),
            },
          },
        },
      });

      processedCount++;
    } catch (error) {
      console.error(`  ❌ 处理行时发生错误: ${JSON.stringify(row)}. Error:`, error);
    }
  }

  console.log(`\n🎉 导入完成!`);
  console.log(`   成功处理: ${processedCount} 条记录`);
  if (skippedCount > 0) {
    console.log(`   跳过: ${skippedCount} 条记录`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });