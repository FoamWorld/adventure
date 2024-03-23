# Mercury & Milfoil
## 关于
一个交互式小说和它基于 Ink 的轻风格引擎（扩展）。
* [相关帖](https://scp-wiki-cn.wikidot.com/forum/t-16705305/)

## 注意事项
* 在微信中打开网页可能导致 `iframe` 中内容无法显示

## 许可说明
`script` 下代码除 `script/story.js` 外使用 MIT 许可证，其中仅 `script/main.js` 参考了，`script/ink.js` 沿用了 [inkle](https://github.com/inkle) 提供的标准代码。

`assets/cards`，`assets/data` 下文件使用 MIT 许可证，主要来自 [iconhunt](https://iconhunt.site/) 搜索引擎提供的开源矢量图标。

`assets/css/ink.css` 参考了 [inkle](https://github.com/inkle) 提供的标准代码。

`assets/ink` 下文件使用 CC BY-SA 许可，所用素材资源的列举可见于[素材列表](./source_list.html)。

`script/story.js` 由 `assets/ink` 下文件使用 [Inky](https://github.com/inkle/inky) 生成，使用 CC BY-SA 许可。

## 主线进程

## 扩展功能
- 玩法
	- [x] 关卡模式
	- [ ] 随机生成
	- [ ] 玩家属性
- 存档
	- [x] 回退
	- [ ] 设置存档方式（手动|定时|关闭时）
	- [ ] 多存档
	- [ ] 存档下载/上传
- 统计
	- [x] 结局统计
	- [ ] 结局列表
	- [x] 成就统计
	- [x] 成就获得提示
	- [ ] 成就列表
- 对象
	- [ ] 卡片栏
	- [ ] 详细信息层
	- [ ] 快捷键
	- [ ] 拖动效果
	- [ ] 地图

## 更新说明
**v0.1.10**
* 修改结局显示、TLE 结局的标度
* 添加 1-1 战斗，1-2 使用棋盘提示
* 内容微调
* 修复 `putNotification` 的多消息处理
* 修复 `TITLE` 显示

**v0.1.9**
* 修改标题为“Mercury & Milfoil”
* 完成 1-3 剧情框架
* 修复 layui 加载失败的后续问题
* 添加设置

**v0.1.0**
* 确定大致形式

## 鸣谢
感谢 @真的张茗之 测试 `v0.1.9`
