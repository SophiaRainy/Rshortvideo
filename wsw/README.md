# Next.js 14 短视频应用

## 项目简介
这是一个使用 Next.js 14 开发的短视频 Web 应用。用户可以浏览视频，点赞，评论，并且可以在个人资料页面查看自己的信息。

## 项目目标
- 创建一个流畅的短视频浏览体验
- 实现视频点赞和评论功能
- 提供用户认证（登录/注册）功能
- 实现个人资料页面
- 提供响应式设计，适配各种设备

## 技术栈
- Next.js 14
- React
- TypeScript
- Tailwind CSS (用于样式)
- MySQL (用于数据存储)
- bcrypt (用于密码加密)

## 主要功能
1. 视频浏览：上下滑动切换视频
2. 点赞功能：用户可以为视频点赞
3. 评论系统：用户可以查看和发表评论
4. 用户认证：支持用户注册和登录
5. 个人资料：用户可以查看和编辑个人信息
6. 底部导航：提供快速访问不同页面的导航栏

## 项目结构
/
├── app/                 # 应用主目录 (使用App Router)
│   ├── layout.tsx       # 根布局组件
│   ├── page.tsx         # 首页 (视频浏览页)
│   ├── login/           # 登录页面
│   ├── register/        # 注册页面
│   ├── profile/         # 个人资料页面
│   └── api/             # API路由
├── components/          # 可重用的React组件
│   ├── VideoPlayer.tsx  # 视频播放器组件
│   ├── VideoFeed.tsx    # 视频列表组件
│   ├── LikeButton.tsx   # 点赞按钮组件
│   ├── CommentSection.tsx # 评论区组件
│   └── BottomNav.tsx    # 底部导航组件
├── lib/                 # 工具函数和自定义hooks
│   ├── api.ts           # API调用函数
│   ├── db.ts            # 数据库连接
│   ├── AuthContext.tsx  # 认证上下文
│   └── useSwipe.ts      # 自定义滑动hook
├── public/              # 静态资源
├── styles/              # 全局样式
├── next.config.js       # Next.js配置文件
├── package.json         # 项目依赖和脚本
└── tsconfig.json        # TypeScript配置文件

## 开发指南
1. 克隆项目仓库
2. 安装依赖: `npm install`
3. 设置环境变量:
   - 创建 `.env.local` 文件
   - 添加数据库连接信息: 
     ```
     DB_HOST=your_db_host
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     ```
4. 运行开发服务器: `npm run dev`
5. 在浏览器中打开 `http://localhost:3000`

## 部署
本项目可以部署在 Vercel 平台上。确保在部署时设置正确的环境变量。

## 注意事项
- 确保 MySQL 数据库已正确设置并运行
- 视频源目前使用模拟数据，可以根据需要替换为实际的视频 API
- 用户认证使用基本的用户名和密码方式，可以根据需要增强安全性

## 未来改进
- 实现视频上传功能
- 添加社交功能，如关注其他用户
- 优化视频加载和缓存策略
- 实现更高级的用户权限管理
