
1. 一点点思考 做长期有价值的事情，个人很喜欢看live那就做一个偏炫技的网站吧

music tracker
使用kworb网站作为数据源头 https://kworb.net/



├── client/      # React + Vite 前端

└── server/      # Node.js + Express + Prisma 后端


# client前端
npm install  

npm run dev


# prisma数据库端
server文件夹下
### Migrate DB (update schema)
npx prisma migrate dev

### 注入数据方式
ts-node prisma/import-csv.ts olivia
ts-node prisma/import-csv.ts weeknd

### 删除数据
ts-node prisma/clear-database.ts

### 完全初始化数据库并且run seed command
npx prisma migrate reset

### 打开网页数据库验证
npx prisma studio

# server 后端
npm run dev



#### 2025-06-25 最基本的功能思路都实现了
TODO
学一下 react-three-fiber
普信ai css一拖

接下来三大部分
1. 数据库填鸭 -- continue work

新功能TO DO
1. 展示一下是否已喜欢这个 - threejs

根据学的threejs一点点改进现有的component

目前发现最大的问题就是不平衡
比如 韩语歌
中文歌
在spotify之前出现的歌曲
需要一个多维度的评价来中和ranking

后面的feature可以偏向专辑specific


