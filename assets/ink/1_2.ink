== 1_2 ==
~ chapter = "1-2"
#CLEAR
<h3>02 招魂</h3>
<h4>黎明也可以折断羽翼</h4>
<hr>
-> introduction

= introduction
.#CHECKPOINT: set
你穿过了一个怪异设施的大门，来到一栋小屋前。
Dgeros：“欢迎来到……呃……你先把这个戴上。”
- (opts)
	* (explanation) [◇ 认知危害过滤器]
	    “这是用来消除一般的认知危害的，戴在手腕上就可以了。”
	* {explanation} “认知危害[？”]是什么？”
		“字面意思上，会给认知者带来危害。总之，接下来你需要佩戴。”
	+ (lefthand) [戴在左手]
		左手已经戴了表，扣不上。
		+ + [摘下来] -> conversation
		+ + [再试试？]
	* [戴在右手] -> conversation
- (loop)
	{lefthand > 2:
		-> break_wearable
	- else:
		-> opts
	}

= break_wearable
你用力一扯，带子断了。
……
* [看向 Dgeros]
	“这个能不能修一下。”
	Dgeros 深深地看了你一眼，然后打开了电脑。
	你看见一片花花绿绿的东西闪过。
	-> conversation

= conversation
<hr>
“在测试开始前，你想问些什么？我大体介绍一下，细节以后再说。”
- (opts)
	* (asked) “你们这个组织叫什么？”
		“<span class="ruby">特殊收容措施基金会<span class="rt">Special Containment Procedures Foundation</span></span>。通常简称为‘SCP基金会’。”
		<img class="limited" src="https:\/\/scp-wiki.wdfiles.com/local--files/about-the-scp-foundation/scp-logo-signature.png"/>
	* {asked} “你们是做什么的？”
		“我们的目标是收容异常物品，个体及现象。它们通过物理、心理等危害对全球安全造成显著威胁。”
		“我们维持常态，从地外、异次元和外层空间的影响中维持人类的独立自主。”
		“我们的任务是<span class="ruby">控制<span class="rt">Secure</span></span>（控制异常以防止它们落入平民或敌对组织手中）、<span class="ruby">收容<span class="rt">Contain</span></span>（收容异常以防止它们的影响或效应散播）和<span class="ruby">保护<span class="rt">Protect</span></span>（保护人类免受异常的影响并保护异常本身直至它们被完全理解）。”
		“我们维护着一个关于异常所需，通常称呼为“SCPs”的特殊收容措施的信息的数据库，将异常分类并收容。这些异常称为SCP。”
	* {asked} “有没有其它知晓异常的组织？”
		“有，而且还挺多。一些组织拥有相似的目的并可能与我们合作，但更多组织为投机主义者。与其它组织合作需经领导层明确同意。”
		“近年来一个最大的同行组织是<span class="ruby">全球超自然联盟（GOC）<span class="rt">Global Occult Coalition</span></span>。”
		<img class="limited" src="https:\/\/scp-wiki.wdfiles.com/local--files/goc-hub-page/GOC-Logo-v4.png"/>
	* “如果测试未通过会怎么样？”
		“我们会处理好你的记忆。”
	* “没问题了。”
		{asked != 1:
			“你确定没问题？”
			-> u_end_why
		}
		-> break
- (loop)
	-> opts
- (break)
-> test1

= test1
.#CHECKPOINT: set
你进入了一个房间。唯一的光源是天花板上有些昏暗的灯光，房间中央有一张桌子，上面摆放了一个棋盘和几排棋子。
<hr>
“我们现在开始第一项测试。这把枪可以塞入普通子弹，在使用时思考你见过的生物的名字，就可以杀死它。”
“请用此枪杀死附身在棋子上的恶灵。”
#SCRIPT: include: script/chess/chess_base.js
#SCRIPT: include: script/chess/catchess.js
#SCRIPT: include: script/extra/catchess_test.js
* (asked) “那如果重名会发生什么？”
	“你猜猜看。”
* “……”
-
#SCRIPT: catchess_test: init
#INPUT: t_target_name
+ [确定]
#SCRIPT: catchess_test: check
.
{t_target_name == ".*":
	#AWARD: give regex_master
	“你为什么会觉得它支持正则表达式呢？”
	-> fail
}
{t_target_name == "Dgeros":
	{asked:
		“猜好了吗，重名会发生什么？”
	}
	“你觉得，有没有一种可能，我的描述其实是严重夸大的。”
	-> u_end_demonify
}
{t_target_name == t_password:
	{t_check:
		-> test2
	}
	恶灵附身在了另一颗棋子上。
	你失败了。
	-> fail
}
-> fail

= test2
.#CHECKPOINT: set
“第二项测试是：调查”
-> done

= caught_pataphysics
<hr>
“欢迎来到超形上学部。”
“或许你会好奇为什么你没有杀死那位存在，可能是因为无限嵌入叙事层、<span class="ruby">回旋跨层<span class="rt">cyclical-transgression</span></span>或者<span class="ruby">亚叙事层<span class="rt">sub-diegesis</span></span>理论，或者，只是因为「设定」中那个枪是虚假描述的而已。”
+ “你这‘超形上学’明明是实在论，是前反思的！……”
	“……”
+ “但是我的本体和那位存在在同一层。”
	“……”
+ “……”
	“不过这都不重要，总之……”
-
-> r_end_experimented

= fail
-> u_end_fail

= fail2
不幸的是，恶灵在你操作棋子时附身了你。
-> u_end_die_early

= done
-> to_be_continued
