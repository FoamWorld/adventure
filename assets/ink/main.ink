VAR VERSION = "v0.1.1"

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
		项目仓库：<a href="https:\/\/github.com/foamworld/adventure">Github: FoamWorld/Adventure</a>
		当前版本：{VERSION}
		已完成内容：menu, 1-1
		进行中内容：1-2
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
+ [调节重要游戏节点显示]
	+ + [不显示]
		#SET: processShiny false
	+ + [显示]
		#SET: processShiny true
+ [设置随机模式]
	+ + [正常随机]
		#SET: randomMode "normal"
	+ + [自主设置随机结果]
		#SET: randomMode "editable"
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
<a href="https:\/\/github.com/foamworld/adventure?tab=readme-ov-file">README: 许可说明</a>

使用的素材资源包括：
<hr>
<h3>来自 Wikidot（scp-cn）的设定参考（CC BY-SA）</h3>
注：作者信息可见于对应的页面中 #CLASS: help
#LIST: begin
<a href="https:\/\/scp-wiki-cn.wikidot.com/goc-hub-page">全球超自然联盟档案</a>（1-2 中参考）
<a href="https:\/\/scp-wiki-cn.wikidot.com/introduction-to-pataphysics">超形上学导论</a>（在 1-2 分支中出现）
#LIST: end
<hr>
<h3>SCP Universe 相关其它来源的资料参考</h3>
#LIST: begin
通用设定
#LIST: end
<hr>
图片如无标注均以来源为链接，遵循相关站点的协议许可。
#AWARD: give examine_permission
+ [返回] -> menu
