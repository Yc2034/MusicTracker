
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
### 注入数据
npx prisma db seed 

### 另一个方式
ts-node prisma/import-csv.ts 

ts-node prisma/clear-database.ts

### 打开网页数据库验证
npx prisma studio

# server 后端
npm run dev



TODO

1. Update database
2. See if new column required
3. Create a page for global rank, then create separate rank for each of them