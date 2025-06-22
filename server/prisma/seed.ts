// server/prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// 初始化 Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // 使用 upsert 来创建歌手
  // upsert 的好处是：如果记录已存在，则什么都不做；如果不存在，则创建。
  // 这让我们的 seed 脚本可以重复运行而不会出错。
  const olivia = await prisma.artist.upsert({
    where: { name: 'olivia rodrigo' },
    update: {}, // 如果已存在，我们不需要更新任何东西
    create: {
      name: 'olivia rodrigo',
      // 使用嵌套写入(nested write)的方式，在创建歌手的同时，也为她创建歌曲
      songs: {
        create: [
          {
            title: 'drivers license',
            // 同时，为这首歌创建一条播放量记录
            stream_records: {
              create: {
                // streams 字段是 BigInt，需要在数字后面加一个 'n'
                streams: 2527807470n, 
                // 记录日期，这里我们用昨天的日期作为示例 (2025-06-20)
                record_date: new Date('2025-06-20T00:00:00Z'),
              },
            },
          },
          // 您可以在这里添加 Olivia 的其他歌曲
          // {
          //   title: 'good 4 u',
          //   stream_records: { create: { ... } }
          // }
        ],
      },
    },
    // include 可以在创建/查找后，将关联的数据一并返回
    include: {
      songs: {
        include: {
          stream_records: true,
        },
      },
    },
  });


    const weeknd = await prisma.artist.upsert({
    where: { name: 'the weeknd' },
    update: {}, // 如果已存在，我们不需要更新任何东西
    create: {
      name: 'the weeknd',
      // 使用嵌套写入(nested write)的方式，在创建歌手的同时，也为她创建歌曲
      songs: {
        create: [
          {
            title: 'blinding lights',
            // 同时，为这首歌创建一条播放量记录
            stream_records: {
              create: {
                // streams 字段是 BigInt，需要在数字后面加一个 'n'
                streams: 4891157230n, 
                // 记录日期，这里我们用昨天的日期作为示例 (2025-06-20)
                record_date: new Date('2025-06-20T00:00:00Z'),
              },
            },
          },
          // 您可以在这里添加 Olivia 的其他歌曲
          // {
          //   title: 'good 4 u',
          //   stream_records: { create: { ... } }
          // }
        ],
      },
    },
    // include 可以在创建/查找后，将关联的数据一并返回
    include: {
      songs: {
        include: {
          stream_records: true,
        },
      },
    },
  });

  console.log(`Seeding finished.`);
  console.log(`Created artist with songs:`);
  console.dir(olivia, { depth: null });
  console.dir(weeknd, { depth: null });
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