// server/src/index.ts (最终解决方案)

import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 这个接口定义是完全正确的
interface ArtistParams {
  name: string;
}

// 使用 .then() 链式语法重写路由，以绕过 async/await 的类型推断问题
app.get('/api/artist/:name', (req: Request<ArtistParams>, res: Response) => { // 注意：函数前没有 async
  const { name } = req.params;

  prisma.artist.findUnique({
    where: { name },
    include: {
      songs: {
        include: {
          stream_records: {
            orderBy: {
              record_date: 'desc',
            },
            take: 1,
          },
        },
      },
    },
  })
  .then(artistData => {
    if (!artistData) {
      // 在 .then() 内部，我们直接返回响应
      return res.status(404).json({ error: 'Artist not found' });
    }
    
    // BigInt 到字符串的转换
    const replacer = (key: string, value: any) =>
      typeof value === 'bigint' ? value.toString() : value;

    const jsonString = JSON.stringify(artistData, replacer);

    // 发送成功响应
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonString);
  })
  .catch(error => {
    // 统一处理查询过程中可能发生的任何错误
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  });
});


// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});