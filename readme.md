
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
#### 2025-06-30 功能完毕，剩下数据填鸭
#### 2025-07-01 挺好玩的搞了个vibe coding，但是核心矛盾解决不了，spotify不是ground truth，中日韩无法与英语流行同场竞技
#### 历时两周的vibe coding项目就此宣告解散 最大的好处就是把之前的一个单独列表扩展成了一个带一定交互的网站


#### 2025-07-17
How to do 2D threejs
Creating Complex Shapes with SVG 🎨
Manually typing coordinates for curves is very difficult. The best way to create custom shapes is to draw them in a vector graphics editor and then convert them to Three.js code. The standard format for this is SVG (Scalable Vector Graphics).

Here’s a common workflow:

Draw Your Shape: Use a free vector editor like Figma (web-based) or Inkscape (desktop) to draw your desired shape with the pen tool.

Export as SVG: Save or export your drawing as an .svg file.

Use SVGLoader: Three.js has a built-in SVGLoader that can read your SVG file directly and create the shapes for you. This is the most powerful and recommended method.

SVGLoader as shown previously, it only extracts the shape data (the geometry) from the SVG file. Any fill or stroke colors defined within the SVG file itself are ignored by this process.

