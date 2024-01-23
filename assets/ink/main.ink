CONST VERSION = "v0.1.0-alpha"

INCLUDE 1_1.ink
INCLUDE 1_2.ink
INCLUDE endings.ink

// 重要变量
VAR chapter = ""
VAR player_name = "Anonymous"

// 辅助指令的临时变量
VAR t_check = true
VAR t_password = ""
VAR t_random = 0
VAR t_target_name = ""

// 流程
-> menu
== menu ==
#CLEAR
#APPEAR: main-title
+ [新的开始] -> beginning
+ [章节选择]
	+ + [1-1 仪式] -> 1_1
    + + [1-2 招魂] -> 1_2
	+ + [返回] -> menu
+ [游戏设置] -> setting
+ [统计数据] -> statistics
+ [作品信息]
	+ + [关于]
		作者：Rratic
		使用工具：<a href="https:\/\/www.inklestudios.com/ink">Ink</a>
		当前版本：{VERSION}
		当前更新至：1-2
		+ + + [返回] -> menu
	+ + [许可信息] -> permission

== beginning ==
#CLEAR
注意多存档；要保存的非导出存档储存在浏览器中，请勿清理 #CLASS: help
确定要使用名称“{player_name}”吗？
+ [前往设置]
	-> set_name() -> beginning
+ [确定] -> jump

= jump
第壹章 秩序：秩序的天平倒向秩序 #CLASS: help
+ [故事就此开始……] -> 1_1
+ [不是，你先等等] -> menu

== setting ==
-> main

= main
#CLEAR
+ [命名]
	-> set_name() ->
+ [调节文本出现速度]
	+ + [慢]
		#SET: textSpeed 400.0
	+ + [普通]
		#SET: textSpeed 200.0
	+ + [快]
		#SET: textSpeed 100.0
	+ + [瞬间]
		#SET: textSpeed "instant"
+ [调节选项出现速度]
	+ + [普通]
		#SET: optionSpeed 200.0
	+ + [瞬间]
		#SET: optionSpeed "instant"
+ [设置随机模式]
	+ + [正常随机]
		#SET: randomMode "normal"
	+ + [显示随机发生位置]
		#SET: randomMode "shiny"
	+ + [自主设置随机结果]
		#SET: randomMode "editable"
+ [调节图片显示]
	+ + [显示]
		#SET: displayImage true
	+ + [不显示]
		#SET: displayImage false
+ [返回] -> menu
-
-> main

=== set_name()
	#INPUT: player_name
	+ [确定]
	{player_name == "":
		~ player_name = "Anonymous"
	}
	{player_name == "Rratic":
		->-> r_end_god_name
	}
	->->

== statistics ==
#CLEAR
#DISPLAY: ends
#DISPLAY: awards
+ [返回] -> menu

== permission ==
#CLEAR
本作品按照 CC BY-SA 协议许可。使用的资源包括：
<h3>技术参考</h3>
#LIST: begin
Ink 标准代码
#LIST: end

<h3>来自 Wikidot（scp-cn）的设定参考（CC BY-SA）</h3>
注：作者信息可见于对应的页面中 #CLASS: help
#LIST: begin
<a href="https:\/\/scp-wiki-cn.wikidot.com/goc-hub-page">全球超自然联盟档案</a>（1-2 中参考）
<a href="https:\/\/scp-wiki-cn.wikidot.com/scp-cn-2458">scp-cn-2458 - 曲奇就是这样碎的</a>（在 1-2 概率分支中出现）
<a href="https:\/\/scp-wiki-cn.wikidot.com/introduction-to-pataphysics">超形上学导论</a>（在 1-2 分支中出现）
#LIST: end

<h3>SCP Universe 相关其它来源的资料参考</h3>
#LIST: begin
通用设定
#LIST: end

<h3>其它资料参考</h3>
#LIST: begin
<a href="https:\/\/space.bilibili.com/23191782/channel/seriesdetail?sid=1424248">未明子视频合集【主义主义】</a>（在 1-2 分支中参考）
#LIST: end

图片如无标注均以来源为链接，遵循相关站点的协议许可。
#AWARD: give examine_permission
+ [返回] -> menu
