== 1_1 ==
~ chapter = "1-1"
#CLEAR
<h3>01</h3>
<h4>既遵道而得路</h4>
<hr>
-> introduction

= introduction
.#CHECKPOINT: set
2019，夏，橘白城。
那是一个太阳行将就木的傍晚，你独自一人走在公园的小路上。
你看了看表，19点53分，是时候回去了。
忽然，你发现前方隐隐约约有阴绿的火光，伴随阵阵压抑的呢喃。
“东皇……” #CLASS: distort
周遭的现实开始微微颤动，那些文字在你的脑海中扭曲。
* 灾厄找上你并不需要什么理由
    <>，更不必说找上它的是你。
    -> inplot
* .
    * * 看起来不太妙？
        -> inplot
    * * ……[？]发生了什么？
        在你茫然无措时，阴绿向你侵袭而来。
        -> c_end_why

= inplot
你抑制自己不去听，这绝对是超自然现象。
* [调查]
    你离火光越来越近，这也使你看清了更多细节：草坪上有一座低矮、灰黑色的祭坛，站着三位灰袍人。祭台上方摊开着一本书，散溢出几个阴绿的符号，异常坚定地烙印在那里。
    * * [逃跑] -> runaway
    * * [上前]
        你看见一个复杂又似乎有一些规律的图形逐渐变成几个相同的符号：
        &\#5822; #CLASS: rune-evil
        -> investigate
* [逃跑] -> runaway
* [报警]
    你迅速拨打电话，说明了这里的情况。
    -> callpolice
+ ->
	你似乎只能原地等死 -> END

= investigate
.#CHECKPOINT: set
你不知道这些代表着什么、为什么会闪闪发亮。
不过面前的三位灰袍人肯定不关心这一点。他们还在空洞地看着祭台上的书，嘴里无意识地发出呢喃。
- (opts)
    * (stone) [捡起石头]
        你从碎石堆里捡起数块石头。
    * (stick) [折下树枝]
        你折下一根树枝。
        那棵树在你面前碎成一地粉末。
    * [逃跑]
        {loop == 0:
            -> runaway
        - else:
            已经逃不掉了。
            -> c_end_too_late
        }
    * (try) [也许可以尝试……]
    * {try} [攻击灰袍人]
        他们身前有一道玻璃墙一般的阻碍，使你无法通过。
    * {try} [打不过就加入]
        你尝试辨别那些语言，那是：
        “东皇太一” #CLASS: distort
        “打开天国的” #CLASS: distort
        #RANDOM: uniform_int_distribution 1 2
        {t_random == 1:
            -> u_end_why
        - else:
            -> u_end_martyrdom
        }
    * {try} [触碰符文] -> bitten
    + (throw) {try && stone} [朝符文扔石头]
        你试着朝符文扔石头，似乎并没有得到什么反馈。
    * {try && stick} [用树枝打符文]
        {throw > 1:
            -> action
        }
        你刚用树枝接触到符文，就感受到一股强大的吸力。
        然后你被蚕食殆尽。
        {throw == 0:
            -> u_end_why
        - else:
            -> c_end_give_up_halfway
        }
- (loop)
    {loop == 10:
        -> ritual
    - else:
        -> opts
    }

= bitten
你试着触碰符文，突然感到手指被什么东西咬住了，并且身体动弹不得。
然后你被蚕食殆尽。
-> u_end_why

= ritual
忽然，稠密至极的阴绿色火焰从符文中喷涌出来。
-> u_end_time_limit_exceeded

= action
你试着打下那些闪光的符文……
它们就那样落了下来，洒得祭台上到处都是，然后忽然变成深青色的下陷痕迹。
随着符文的一一落下，中间包裹的东西露了出来：
“东皇太一”的残骸。#CLASS: holy
那是一本书，上面涂满了三个灰袍人的躯壳；
那是被你的石头打死的。
#RANDOM: uniform_int_distribution 1 3
{t_random == 1:
    一丝灵感缠绕到你身上：那就是所谓的“神”。
}
* 几只乌鸦惊叫着、拍打着翅膀飞开了。
-> meet

= runaway
这诡异的场景把你惊住了。你赶忙转身奔跑……
可是，来时的那条小路不知何时变得很长，一直延申到视野尽头。
你的力量逐渐耗尽，眼前的景象开始模糊。
忽地，你听到了似乎来自人类的呢喃。
* “[谁？”]你是谁？” ->
    ……
    或许本该有回答的，但你已经听不见了。
    -> c_end_why
* [尽力前进] ->
    #CLEAR
    忽然间，场景破碎，记忆中的小路镜头出现在眼前。
    <hr>
    后来，你的生活回归了正常。这次事件掀起的波澜没过多久就被现实的熙熙攘攘消磨了
    -> frag_escape_with_memory
* [原地休息] ->
    休息一下或许可以恢复体力？
    就在你这么想着的时候，阴绿吞噬了你。
    -> c_end_why

= callpolice
“我们已经派专业人员去处理了。说说看，为什么觉得报警可以解决？”
* “反正我处理不了。” -> meet
* “既然这样的……超自然事件会发生，而我们却一直不了解，背后显然有专门的组织[。”]
    <>，不管是政府还是非政府的，监测电话应该是小菜一叠。”
    -> meet

= meet
.#CHECKPOINT: set
<hr>
几分钟后，三个穿着制服的人出现在你眼前。
“很抱歉你被卷入……”
“一批‘邪教徒’在尝试举行仪式。”
{action:
    “你做得很好。”
}
- (opts)
    * “邪教？”
        “他们信仰一位叫“东皇太一”的神。”
    * “这么快就调查清楚了？”
        “我们先前就利用鹬推测到他们在这一带举行仪式。”
        * * “鹬？……不是什么乌鸦？”
            “……”
    * [没有问题了] -> break
- (loop)
    -> opts
- (break)
“你们告诉了我这么多，所以……
你们可以抹除我这一段的记忆？”
“当然。”
* [接受记忆删除]
    -> frag_escape_without_memory
* {action} “我可以加入你们吗？”
    * * [QwQ] -> done

= done
“……”
“请跟着我们走。”
-> 1_2
