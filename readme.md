
1. 一点点思考 做长期有价值的事情，个人很喜欢看live那就做一个偏炫技的网站吧

music tracker
使用kworb网站作为数据源头 https://kworb.net/
setfm 作为现场查询


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

### 删除指定数据 在里面填歌曲信息
打开网页数据库，先删除streamRecord 再删除对应的歌曲

### 完全初始化数据库并且run seed command
npx prisma migrate reset

### 打开网页数据库验证
npx prisma studio

# server 后端
npm run dev



#### 2025-06-25 最基本的功能思路都实现了
#### 2025-06-30 功能完毕，剩下数据填鸭
#### 2025-07-01 挺好玩的搞了个vibe coding的mvp
#### 2025-07-20 加了react motion tilt 加了音乐节数据 提升了基础ui 做了最简单的threejs

#### 2025-07-24 加了podium颁奖台，稍微提升了ui layout
#### 2025-07-25 Add custom svg, kudos to gemini
#### 2025-08-02 加入了音频播放功能
#### 2025-08-03 采用minialist风格重置了基础页面
#### 2025-08-04 SongList style update Use design pattern: Glassmorphism is a UI design style that creates a "through the glass" look and feel. 

未来的方向
1.
数据源补齐
kissoflife yoasobi aespa
wheein ive g-idle itzy 
 blackpink

concert
taylor swift
tyler the creator

2. 中韩特定数据补齐 数据库redesign
邓紫棋 周深 林俊杰
IU

3. 做一套新的svg 改一个新的threejs 模板 做一个tab

4. 补充top aritst的图源

5. artistheader 现在看起来太空了 需要补一些图片或者效果


5. 
可以做一个大的three js 播放器 每日随机 webgl方向 前后端

Check web design:
https://dribbble.com/
https://www.awwwards.com/inspiration/music-page-clara-venice


Suggested prompt for imageGen

1.

Cinematic atmospheric portrait of [Artist Name], moody and introspective, dramatic chiaroscuro lighting, shot on film, deep rich colors against a dark minimalist background, with significant negative space on the left, photorealistic, 8K --ar 16:9

2.

Ethereal half-lit portrait of [Artist Name] emerging from shadows, volumetric light beams cutting through a hazy, atmospheric scene, desaturated tones with a single accent of [A Key Color, e.g., neon green or electric blue], minimalist composition, hyper-detailed, feeling of quiet intensity --ar 16:9

3.

High-fashion editorial photograph of [Artist Name], striking a powerful pose, profile shot with sharp rim lighting, monochrome color palette, set in a vast, empty brutalist architectural space, ultra-detailed fabric textures, elegant and dominant composition --ar 16:9