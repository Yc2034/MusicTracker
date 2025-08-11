
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
#### 2025-08-08 whole ui 风格一体化
#### 2025-08-10 做出了想要的钢琴风

未来的方向
1.
数据源补齐
yoasobi aespa
wheein g-idle 
 blackpink

concert
taylor swift
tyler the creator

2. 中韩特定数据补齐 只改前端display 换数据源后端不改schema
邓紫棋 周深 林俊杰 IU

3. 改一下当前artist header里面的播放器
不用全场音乐，用截取的3-5min音频 并且展示音频名字 
单个音乐 主要展示没有视频cover的音乐 经典案例 in the stars

4. 做一个新页面 视频
像小抖音一样 做精彩的视频片段播放器，滑动播放，都选择竖屏视频

5. 
可以做一个大的three js 播放器 每日随机 webgl方向
音乐 + 专辑封面 + 现场音乐mp3 


Check web design:
https://thefwa.com/awards/page/1/
https://www.awwwards.com/inspiration/music-page-clara-venice


Suggested prompt for imageGen

1. Dark mode

Cinematic atmospheric portrait of [Artist Name], moody and introspective, dramatic chiaroscuro lighting, shot on film, deep rich colors against a dark minimalist background, with significant negative space on the left, photorealistic, 8K --ar 16:9

2. Bright mode

Bright and airy cinematic portrait of [Artist Name], contemplative and open, soft diffused lighting, shot on film, deep rich colors against a light minimalist background, subject small in frame and positioned on the right side with significant negative space on the left, facing towards the right, photorealistic, 8K --ar 16:9





