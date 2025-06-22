// server/prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// 初始化 Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // 使用 upsert 来创建或查找歌手
  // 这种做法很稳健，可以重复运行此脚本而不会创建重复的歌手
  const stephen = await prisma.artist.upsert({
    where: { name: 'stephen sanchez' },
    update: {}, 
    create: {
      name: 'stephen sanchez',
      // 使用嵌套写入(nested write)的方式，在创建歌手的同时，也为他创建歌曲
      songs: {
        create: [
          {
            title: 'until I found you',

            // --- 从这里开始是根据您的新格式新增的字段 ---
            is_liked: true,
            live_event_venue: 'Govball 2024',
            live_event_location: 'New York',
            release_date: new Date('2012-03-11'),
            live_event_date: new Date('2024-06-09'),
            // 同时，为这首歌创建一条播放量记录
            stream_records: {
              create: {
                // streams 字段是 BigInt，需要在数字后面加一个 'n'
                streams: 1307031121n,
                // 记录日期
                record_date: new Date('2025-06-20'),
              },
            },
          },
        ],
      },
    },
    // include 可以在创建/查找后，将关联的数据一并返回，便于在控制台查看
    include: {
      songs: {
        include: {
          stream_records: true,
        },
      },
    },
  });

  console.log(`Seeding finished.`);
  console.log(`Created/found artist with songs:`);
  console.dir(stephen, { depth: null });
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