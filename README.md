# 网络质量指数 App

一个基于 HTML/CSS/JavaScript 的家庭网络质量可视化应用，支持户型图设计、路由器位置管理、实时信号热力图。

## 功能

- **首页**：展示户型图、设备状态、信号热力图
- **网络状态**：实时显示各房间的信号强度（绿→红渐变热力图）
- **路由器位置**：支持多路由器拖拽定位、可视化信号覆盖范围
- **户型图设置**：拖拽式户型设计器，支持房间模块自由组合、调整大小、删除

## 技术栈

- 纯 HTML5 / CSS3 / JavaScript，无构建依赖
- SVG 矢量图形渲染（户型图、3D 路由器、热力图）
- Canvas 实时渲染信号热力图
- localStorage 本地持久化
- 响应式设计，适配移动端

## 页面

- `index.html` — 首页
- `network-status.html` — 网络状态
- `router-position.html` — 路由器位置
- `floorplan-settings.html` — 户型图设计
- `profile.html` — 个人中心
- `toolbox.html` — 工具箱
- `floorplan-config.js` — 共享配置（房间模块、路由器定义、SVG 生成）
