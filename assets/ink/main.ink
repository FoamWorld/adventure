VAR VERSION = "v0.1.7"
VAR DEBUG_MODE = false

INCLUDE 1_1.ink
INCLUDE 1_2.ink
INCLUDE 1_3.ink
INCLUDE fragments.ink
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
#TITLE: Main
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
+ {DEBUG_MODE} [调试区间] -> debug

== beginning ==
#CLEAR
注意多存档；要保存的非导出存档储存在浏览器中，请勿清理 #CLASS: help
确定要使用名称“{player_name}”吗？
+ [前往设置]
	-> set_name() -> beginning
+ [确定] -> jump

= jump
#TITLE: 第一章 秩序：秩序的天平倒向秩序
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
	重要游戏节点包括存档点和随机分支。
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
<ul><li><a href="https:\/\/github.com/foamworld/adventure?tab=readme-ov-file">README: 许可说明</a></li><li><a href="source_list.html">素材列表</a></li></ul>
#AWARD: give examine_permission
+ [返回] -> menu

== debug ==
{~ t_random = 0}
.#RANDOM: uniform_int_distribution 0 255
随机：{t_random}
+ [返回] -> menu
