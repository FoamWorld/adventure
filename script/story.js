var storyContent = ﻿{"inkVersion":20,"root":[["\n","\n","\n",{"->":"menu"},["done",{"#f":5,"#n":"g-0"}],null],"done",{"menu":[[{"#":"CLEAR"},{"#":"APPEAR: main-title"},"ev","str","^新的开始","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^章节选择","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^游戏设置","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^统计数据","/str","/ev",{"*":".^.c-3","flg":4},"ev","str","^作品信息","/str","/ev",{"*":".^.c-4","flg":4},{"c-0":["^ ",{"->":"beginning"},"\n",{"#f":5}],"c-1":["\n",["ev","str","^1-1 仪式","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^1-2 招魂","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^返回","/str","/ev",{"*":".^.c-2","flg":4},{"c-0":["^ ",{"->":"1_1"},"\n",{"#f":5}],"c-1":["^ ",{"->":"1_2"},"\n",{"#f":5}],"c-2":["^ ",{"->":"menu"},"\n",{"#f":5}]}],{"#f":5}],"c-2":["^ ",{"->":"setting"},"\n",{"#f":5}],"c-3":["^ ",{"->":"statistics"},"\n",{"#f":5}],"c-4":["\n",["ev","str","^关于","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^许可信息","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n","^项目仓库：<a href=\"https://github.com/foamworld/adventure\">Github: FoamWorld/Adventure</a>","\n","^当前版本：","ev",{"VAR?":"VERSION"},"out","/ev","\n","^已完成内容：menu, 1-1","\n","^进行中内容：1-2","\n",["ev","str","^返回","/str","/ev",{"*":".^.c-0","flg":4},{"c-0":["^ ",{"->":"menu"},"\n",{"#f":5}]}],{"#f":5}],"c-1":["^ ",{"->":"permission"},"\n",{"#f":5}]}],{"#f":5}]}],{"#f":1}],"beginning":[[{"#":"CLEAR"},"^注意多存档；要保存的非导出存档储存在浏览器中，请勿清理 ",{"#":"CLASS: help"},"\n","^确定要使用名称“","ev",{"VAR?":"player_name"},"out","/ev","^”吗？","\n","ev","str","^前往设置","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^确定","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n",{"->t->":"set_name"},{"->":".^.^.^"},{"#f":5}],"c-1":["^ ",{"->":".^.^.^.jump"},"\n",{"#f":5}]}],{"jump":[["^第壹章 秩序：秩序的天平倒向秩序 ",{"#":"CLASS: help"},"\n","ev","str","^故事就此开始……","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^不是，你先等等","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["^ ",{"->":"1_1"},"\n",{"#f":5}],"c-1":["^ ",{"->":"menu"},"\n",{"#f":5}]}],{"#f":1}],"#f":1}],"setting":[{"->":".^.main"},{"main":[[{"#":"CLEAR"},"ev","str","^命名","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^调节文本出现速度","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^调节选项出现速度","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^调节重要游戏节点显示","/str","/ev",{"*":".^.c-3","flg":4},"ev","str","^设置随机模式","/str","/ev",{"*":".^.c-4","flg":4},"ev","str","^调节图片显示","/str","/ev",{"*":".^.c-5","flg":4},"ev","str","^返回","/str","/ev",{"*":".^.c-6","flg":4},{"c-0":["\n",{"->t->":"set_name"},{"->":".^.^.g-0"},{"#f":5}],"c-1":["\n",["ev","str","^慢","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^普通","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^快","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^瞬间","/str","/ev",{"*":".^.c-3","flg":4},{"c-0":["\n",{"#":"SET: textSpeed 400.0"},{"->":".^.^.^.^.g-0"},{"#f":5}],"c-1":["\n",{"#":"SET: textSpeed 200.0"},{"->":".^.^.^.^.g-0"},{"#f":5}],"c-2":["\n",{"#":"SET: textSpeed 100.0"},{"->":".^.^.^.^.g-0"},{"#f":5}],"c-3":["\n",{"#":"SET: textSpeed \"instant\""},{"->":".^.^.^.^.g-0"},{"#f":5}]}],{"#f":5}],"c-2":["\n",["ev","str","^普通","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^瞬间","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n",{"#":"SET: optionSpeed 200.0"},{"->":".^.^.^.^.g-0"},{"#f":5}],"c-1":["\n",{"#":"SET: optionSpeed \"instant\""},{"->":".^.^.^.^.g-0"},{"#f":5}]}],{"#f":5}],"c-3":["\n",["ev","str","^不显示","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^显示","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n",{"#":"SET: processShiny false"},{"->":".^.^.^.^.g-0"},{"#f":5}],"c-1":["\n",{"#":"SET: processShiny true"},{"->":".^.^.^.^.g-0"},{"#f":5}]}],{"#f":5}],"c-4":["\n",["ev","str","^正常随机","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^自主设置随机结果","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n",{"#":"SET: randomMode \"normal\""},{"->":".^.^.^.^.g-0"},{"#f":5}],"c-1":["\n",{"#":"SET: randomMode \"editable\""},{"->":".^.^.^.^.g-0"},{"#f":5}]}],{"#f":5}],"c-5":["\n",["ev","str","^显示","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^不显示","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n",{"#":"SET: displayImage true"},{"->":".^.^.^.^.g-0"},{"#f":5}],"c-1":["\n",{"#":"SET: displayImage false"},{"->":".^.^.^.^.g-0"},{"#f":5}]}],{"#f":5}],"c-6":["^ ",{"->":"menu"},"\n",{"->":".^.^.g-0"},{"#f":5}],"g-0":[{"->":".^.^.^"},{"#f":5}]}],{"#f":1}],"#f":1}],"set_name":[[{"#":"INPUT: player_name"},"ev","str","^确定","/str","/ev",{"*":".^.c-0","flg":4},{"c-0":["\n","ev",{"VAR?":"player_name"},"str","^","/str","==","/ev",[{"->":".^.b","c":true},{"b":["\n","ev","str","^Anonymous","/str","/ev",{"VAR=":"player_name","re":true},{"->":".^.^.^.9"},null]}],"nop","\n","ev",{"VAR?":"player_name"},"str","^Rratic","/str","==","/ev",[{"->":".^.b","c":true},{"b":["\n","ev",{"^->":"r_end_god_name"},"/ev","->->",{"->":".^.^.^.19"},null]}],"nop","\n","ev","void","/ev","->->",{"#f":5}]}],{"#f":1}],"statistics":[[{"#":"CLEAR"},{"#":"DISPLAY: ends"},{"#":"DISPLAY: awards"},"ev","str","^返回","/str","/ev",{"*":".^.c-0","flg":4},{"c-0":["^ ",{"->":"menu"},"\n",{"#f":5}]}],{"#f":1}],"permission":[[{"#":"CLEAR"},"^<a href=\"https://github.com/foamworld/adventure?tab=readme-ov-file\">README: 许可说明</a>","\n","^使用的素材资源包括：","\n","^<hr>","\n","^<h3>来自 Wikidot（scp-cn）的设定参考（CC BY-SA）</h3>","\n","^注：作者信息可见于对应的页面中 ",{"#":"CLASS: help"},"\n",{"#":"LIST: begin"},"^<a href=\"https://scp-wiki-cn.wikidot.com/goc-hub-page\">全球超自然联盟档案</a>（1-2 中参考）","\n","^<a href=\"https://scp-wiki-cn.wikidot.com/introduction-to-pataphysics\">超形上学导论</a>（在 1-2 分支中出现）","\n",{"#":"LIST: end"},"^<hr>","\n","^<h3>SCP Universe 相关其它来源的资料参考</h3>","\n",{"#":"LIST: begin"},"^通用设定","\n",{"#":"LIST: end"},"^<hr>","\n","^图片如无标注均以来源为链接，遵循相关站点的协议许可。","\n",{"#":"AWARD: give examine_permission"},"ev","str","^返回","/str","/ev",{"*":".^.c-0","flg":4},{"c-0":["^ ",{"->":"menu"},"\n",{"#f":5}]}],{"#f":1}],"1_1":["ev","str","^1-1","/str","/ev",{"VAR=":"chapter","re":true},{"#":"CLEAR"},"^<h3>01 仪式</h3>","\n","^<h4>神灵是否是诡术的仆从</h4>","\n","^<hr>","\n",{"->":".^.introduction"},{"introduction":[["^.",{"#":"CHECKPOINT: set"},"\n","^那是一个夏日的傍晚。太阳已行将就木，可以感受到太阴的躁动。","\n","^你独自一人走在公园的小路上。","\n","^你看了看表，是时候回去了。","\n","^忽然，你发现前方隐隐约约有阴绿的火光，伴随阵阵压抑的呢喃。","\n","^“东皇……” ",{"#":"CLASS: distort"},"\n","^周遭的现实开始微微颤动，那些文字在你脑海中扭曲。","\n","^你抑制自己不去听，这绝对是超自然现象。","\n","ev","str","^前往调查","/str","/ev",{"*":".^.c-0","flg":20},"ev","str","^逃跑","/str","/ev",{"*":".^.c-1","flg":20},"ev","str","^报警","/str","/ev",{"*":".^.c-2","flg":20},{"*":".^.c-3","flg":8},{"c-0":["\n","^你离火光越来越近，这也使你看清了更多细节：一座灰黑色的祭坛、三位灰袍人。祭台上方摊开着一本书，散溢出几个阴绿的符号。","\n","^<i>靠近些……再靠近些……看清那些符号……</i>","\n",["ev","str","^逃跑","/str","/ev",{"*":".^.c-0","flg":20},"ev","str","^看清那些符号","/str","/ev",{"*":".^.c-1","flg":20},{"c-0":["^ ",{"->":"1_1.runaway"},"\n",{"#f":5}],"c-1":["\n","^【符文】禁锢 ",{"#":"CLASS: neon"},"\n",{"->":"1_1.investigate"},{"#f":5}]}],{"#f":5}],"c-1":["^ ",{"->":"1_1.runaway"},"\n",{"#f":5}],"c-2":["\n","^你迅速拨打电话，说明了这里的情况。","\n",{"->":"1_1.callpolice"},{"#f":5}],"c-3":["\n","^你似乎只能原地等死 ","end","\n",{"#f":5}]}],{"#f":1}],"investigate":[["^.",{"#":"CHECKPOINT: set"},"\n","^你不知道那个信息从哪里来，为什么知道那个图形是什么，甚至那几个字还仿佛在闪闪发亮。","\n","^不过面前的三位灰袍人肯定不知道这一点。他们还在空洞地看着祭台上的书，嘴里无意识地发出呢喃。","\n",[["ev",{"^->":"1_1.investigate.0.opts.0.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^“你是谁？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_1.investigate.0.opts.1.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","str","^？”","/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-1","flg":23},{"s":["^“奇术造物",{"->":"$r","var":true},null]}],["ev",{"^->":"1_1.investigate.0.opts.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-2","flg":19},{"s":["^“我为什么要相信你？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_1.investigate.0.opts.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-3","flg":18},{"s":["^“符文是什么？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_1.investigate.0.opts.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":".^.^.c-3"},"/ev",{"*":".^.^.c-4","flg":19},{"s":["^“如何铭刻符文？”",{"->":"$r","var":true},null]}],"ev","str","^捡起石头","/str","/ev",{"*":".^.c-5","flg":20},"ev","str","^折下树枝","/str","/ev",{"*":".^.c-6","flg":20},"ev","str","^逃跑","/str","/ev",{"*":".^.c-7","flg":20},"ev","str","^尝试铭刻符文","/str",{"CNT?":".^.c-4"},"/ev",{"*":".^.c-8","flg":21},"ev","str","^也许可以尝试……","/str","/ev",{"*":".^.c-9","flg":4},{"c-0":["ev",{"^->":"1_1.investigate.0.opts.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.0.s"},[{"#n":"$r2"}],"\n","^【奇术造物】天问 ",{"#":"CLASS: neon"},"\n",{"->":".^.^.^.loop"},{"#f":5}],"c-1":["ev",{"^->":"1_1.investigate.0.opts.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.1.s"},[{"#n":"$r2"}],"^是什么？”","\n","^“字面意思。”","\n","^……","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-2":["ev",{"^->":"1_1.investigate.0.opts.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","^“你没有别的选择。” ",{"#":"CLASS: warning"},"\n",[["ev",{"^->":"1_1.investigate.0.opts.c-2.10.0.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^“当然有。” ",{"->":"$r","var":true},null]}],["ev",{"^->":"1_1.investigate.0.opts.c-2.10.1.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":18},{"s":["^“……”",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"1_1.investigate.0.opts.c-2.10.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.0.s"},[{"#n":"$r2"}],{"->":"u_end_suiside"},"\n",{"->":".^.^.^.^.^.loop"},{"#f":5}],"c-1":["ev",{"^->":"1_1.investigate.0.opts.c-2.10.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.1.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.^.^.loop"},{"#f":5}]}],{"#f":5}],"c-3":["ev",{"^->":"1_1.investigate.0.opts.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n",{"#":"RANDOM: uniform_int_distribution 1 3"},"ev",{"VAR?":"t_random"},1,"==","/ev",[{"->":".^.b","c":true},{"b":["\n","^“符文术法的媒介。可以被铭刻在灵魂或灵性器物上。”","\n",{"->":".^.^.^.15"},null]}],[{"->":".^.b"},{"b":["\n","^“你好像不需要知道这个。”","\n",{"->":".^.^.^.15"},null]}],"nop","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-4":["ev",{"^->":"1_1.investigate.0.opts.c-4.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n","^“你已经知道了。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-5":["\n","^你从碎石堆里捡起数块石头。","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-6":["\n","^你折下一根树枝。","\n","^那棵树在你面前碎成一地粉末。","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-7":["\n","ev",{"CNT?":".^.^.^.loop"},0,"==","/ev",[{"->":".^.b","c":true},{"b":["\n",{"->":"1_1.runaway"},{"->":".^.^.^.8"},null]}],[{"->":".^.b"},{"b":["\n","^已经逃不掉了。","\n",{"->":"c_end_too_late"},{"->":".^.^.^.8"},null]}],"nop","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-8":["\n","^你试着呼唤它们，于是阴绿色的火焰向你缠绕过来，把你淹没。","\n",{"->":"u_end_backfire"},{"->":".^.^.^.loop"},{"#f":5}],"c-9":["\n",["ev","str","^攻击灰袍人","/str","/ev",{"*":".^.c-0","flg":20},"ev","str","^打不过就加入","/str","/ev",{"*":".^.c-1","flg":20},"ev","str","^触碰符文","/str","/ev",{"*":".^.c-2","flg":20},"ev","str","^朝符文扔石头","/str",{"CNT?":".^.^.^.c-5"},"/ev",{"*":".^.c-3","flg":5},"ev","str","^用树枝打符文","/str",{"CNT?":".^.^.^.c-6"},"/ev",{"*":".^.c-4","flg":21},{"c-0":["\n","^他们身前似乎有一道屏障，你过不去。","\n",{"->":".^.^.^.^.^.loop"},{"#f":5}],"c-1":["\n","^你尝试辨别那些语言，那是：","\n","^“东皇太一” ",{"#":"CLASS: distort"},"\n","^“打开天国的” ",{"#":"CLASS: distort"},"\n","^“理智降低。” ",{"#":"CLASS: warning"},"\n",{"#":"RANDOM: uniform_int_distribution 1 2"},"ev",{"VAR?":"t_random"},1,"==","/ev",[{"->":".^.b","c":true},{"b":["\n",{"->":"u_end_why"},{"->":".^.^.^.20"},null]}],[{"->":".^.b"},{"b":["\n",{"->":"u_end_martyrdom"},{"->":".^.^.^.20"},null]}],"nop","\n",{"->":".^.^.^.^.^.loop"},{"#f":5}],"c-2":["^ ",{"->":"1_1.bitten"},"\n",{"->":".^.^.^.^.^.loop"},{"#f":5}],"c-3":["\n","^“攻击生效。” ",{"#":"CLASS: help"},"\n",{"->":".^.^.^.^.^.loop"},{"#f":5}],"c-4":["\n","ev",{"CNT?":".^.^.c-3"},1,">","/ev",[{"->":".^.b","c":true},{"b":["\n",{"->":"1_1.action"},{"->":".^.^.^.7"},null]}],"nop","\n","^你刚用树枝接触到符文，就感受到一股强大的吸力。","\n","^然后你被蚕食殆尽。","\n","ev",{"CNT?":".^.^.c-3"},0,"==","/ev",[{"->":".^.b","c":true},{"b":["\n",{"->":"u_end_why"},{"->":".^.^.^.20"},null]}],[{"->":".^.b"},{"b":["\n",{"->":"c_end_give_up_halfway"},{"->":".^.^.^.20"},null]}],"nop","\n",{"->":".^.^.^.^.^.loop"},{"#f":5}]}],{"#f":5}],"#f":5,"#n":"opts"}],{"loop":["ev",{"CNT?":".^"},10,"==","/ev",[{"->":".^.b","c":true},{"b":["\n",{"->":"1_1.ritual"},{"->":".^.^.^.7"},null]}],[{"->":".^.b"},{"b":["\n",{"->":".^.^.^.^.opts"},{"->":".^.^.^.7"},null]}],"nop","\n",{"#f":5}]}],{"#f":1}],"bitten":["^你试着触碰符文，突然感到手指被什么东西咬住了，并且身体动弹不得。","\n","^然后你被蚕食殆尽。","\n",{"->":"u_end_why"},{"#f":1}],"ritual":["^忽然，稠密至极的阴绿色火焰从符文中喷涌出来。","\n",{"->":"c_end_time_limit_exceeded"},{"#f":1}],"action":[["^你试着打下那些闪光的符文……","\n","^它们落了下来，洒得祭台上到处都是，然后忽然变成深青色的下陷痕迹。","\n","^随着符文的一一落下，中间包裹的东西露了出来：","\n","^“东皇太一”的残骸 ",{"#":"CLASS: holy"},"\n","^那是一本书，上面涂满了三个灰袍人的躯壳；","\n","^那是被你的石头打死的。","\n",{"#":"RANDOM: uniform_int_distribution 1 3"},"ev",{"VAR?":"t_random"},1,"==","/ev",[{"->":".^.b","c":true},{"b":["\n","^一丝灵感缠绕到你身上：那就是所谓的“神”。","\n",{"->":".^.^.^.20"},null]}],"nop","\n",["ev",{"^->":"1_1.action.0.22.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^一只聪慧的乌鸦拍打着翅膀飞开了。",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"1_1.action.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.22.s"},[{"#n":"$r2"}],"\n",{"->":"1_1.meet"},{"#f":5}]}],{"#f":1}],"runaway":[["^这诡异的场景把你惊住了。你赶忙转身奔跑……","\n","^可是，来时的那条小路一直延申到视野尽头。","\n","^你的力量逐渐耗尽，眼前的景象开始模糊。","\n","^“理智降低。”",{"#":"CLASS: warning"},"\n",["ev",{"^->":"1_1.runaway.0.9.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","str","^谁？”","/str","/ev",{"*":".^.^.c-0","flg":22},{"s":["^“",{"->":"$r","var":true},null]}],"ev","str","^尽力前进","/str","/ev",{"*":".^.c-1","flg":20},"ev","str","^原地休息","/str","/ev",{"*":".^.c-2","flg":20},{"c-0":["ev",{"^->":"1_1.runaway.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.9.s"},[{"#n":"$r2"}],"^你是谁？” ","\n","^。。。","\n","^或许本该有回答的，但你已经听不见了。","\n",{"->":"c_end_why"},{"#f":5}],"c-1":["^ ","\n",{"#":"CLEAR"},"^忽然间，场景破碎，记忆中的小路镜头出现在眼前。","\n","^<hr>","\n","^后来，你的生活回归了正常。这次事件掀起的波澜没过多久就被现实的熙熙攘攘消磨了。你会：","\n",["ev","str","^缄默","/str","/ev",{"*":".^.c-0","flg":20},"ev","str","^公之于众","/str","/ev",{"*":".^.c-1","flg":20},{"c-0":["^ ",{"->":"c_end_escape"},"\n",{"#f":5}],"c-1":["\n","^或许太早，或许太晚，迷迷蒙蒙间，一切结束了。","\n",{"->":"u_end_why"},{"#f":5}]}],{"#f":5}],"c-2":["^ ","\n","^休息一下或许可以恢复体力？","\n","^就在你这么想着的时候，阴绿吞噬了你。","\n",{"->":"c_end_why"},{"#f":5}]}],{"#f":1}],"callpolice":[["^“我们已经派专业人员去处理了。说说看，为什么觉得报警可以解决？”","\n",["ev",{"^->":"1_1.callpolice.0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^“反正我处理不了。” ",{"->":"$r","var":true},null]}],["ev",{"^->":"1_1.callpolice.0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","str","^。”","/str","/ev",{"*":".^.^.c-1","flg":22},{"s":["^“既然这样的……超自然事件会发生，而我们却一直不了解，背后显然有专门的组织",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"1_1.callpolice.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],{"->":"1_1.meet"},"\n",{"#f":5}],"c-1":["ev",{"^->":"1_1.callpolice.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n","<>","^，不管是政府还是非政府的，监测电话应该是小菜一叠。”","\n",{"->":"1_1.meet"},{"#f":5}]}],{"#f":1}],"meet":[["^.",{"#":"CHECKPOINT: set"},"\n","^<hr>","\n","^几分钟后，三个穿着制服的人出现在你眼前。","\n","^“很抱歉你被卷入……”","\n","^“一批‘邪教徒’在尝试举行仪式。”","\n","ev",{"CNT?":"1_1.action"},"/ev",[{"->":".^.b","c":true},{"b":["\n","^“你做得很好。”","\n",{"->":".^.^.^.15"},null]}],"nop","\n",[["ev",{"^->":"1_1.meet.0.opts.0.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^“邪教？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_1.meet.0.opts.1.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":18},{"s":["^“这么快就调查清楚了？”",{"->":"$r","var":true},null]}],"ev","str","^说明未知来源的信息的事","/str","/ev",{"*":".^.c-2","flg":20},"ev","str","^没有问题了","/str","/ev",{"*":".^.c-3","flg":20},{"c-0":["ev",{"^->":"1_1.meet.0.opts.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.0.s"},[{"#n":"$r2"}],"\n","^“他们信仰一位叫“东皇太一”的神。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-1":["ev",{"^->":"1_1.meet.0.opts.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.1.s"},[{"#n":"$r2"}],"\n","^“我们先前就利用鹬推测到他们在这一带举行仪式。”","\n",[["ev",{"^->":"1_1.meet.0.opts.c-1.9.0.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^“鹬？……不是什么乌鸦？”",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"1_1.meet.0.opts.c-1.9.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.0.s"},[{"#n":"$r2"}],"\n","^“……”","\n",{"->":"1_1.meet.0.loop"},{"#f":5}]}],{"#f":5}],"c-2":["\n","^“这只是那位神力量的一种体现，现在不用担心了。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-3":["^ ",{"->":".^.^.^.loop.break"},"\n",{"->":".^.^.^.loop"},{"#f":5}],"#f":5,"#n":"opts"}],{"loop":[{"->":".^.^.opts"},["^“你们告诉了我这么多，所以……","\n","^你们可以抹除我这一段的记忆？”","\n","^“当然。”","\n","ev","str","^接受记忆删除","/str","/ev",{"*":".^.c-4","flg":20},["ev",{"^->":"1_1.meet.0.loop.break.12.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":"1_1.action"},"/ev",{"*":".^.^.c-5","flg":19},{"s":["^“我可以加入你们吗？”",{"->":"$r","var":true},null]}],{"c-4":["\n",{"->":"u_end_dream"},{"#f":5}],"c-5":["ev",{"^->":"1_1.meet.0.loop.break.c-5.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.12.s"},[{"#n":"$r2"}],"\n",["ev","str","^QwQ","/str","/ev",{"*":".^.c-0","flg":20},{"c-0":["^ ",{"->":"1_1.done"},"\n",{"#f":5}]}],{"#f":5}],"#f":5,"#n":"break"}],{"#f":5}]}],{"#f":1}],"done":["^“……”","\n","^“你跟着我们走。”","\n","^“谢谢”","\n",{"->":"1_2"},{"#f":1}],"#f":1}],"1_2":["ev","str","^1-2","/str","/ev",{"VAR=":"chapter","re":true},{"#":"CLEAR"},"^<h3>02 招魂</h3>","\n","^<h4>黎明也可以折断羽翼</h4>","\n","^<hr>","\n",{"->":".^.introduction"},{"introduction":[["^.",{"#":"CHECKPOINT: set"},"\n","^你穿过了一个怪异设施的大门，来到一栋小屋前。","\n","^Dgeros：“欢迎来到……呃……你先把这个戴上。”","\n",["ev","str","^◇ 认知危害过滤器","/str","/ev",{"*":".^.c-0","flg":20},["ev",{"^->":"1_2.introduction.0.opts.6.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","str","^？”","/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-1","flg":23},{"s":["^“认知危害",{"->":"$r","var":true},null]}],"ev","str","^戴在左手","/str","/ev",{"*":".^.c-2","flg":4},"ev","str","^戴在右手","/str","/ev",{"*":".^.c-3","flg":20},{"c-0":["\n","^“这是用来消除一般的认知危害的，戴在手腕上就可以了。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-1":["ev",{"^->":"1_2.introduction.0.opts.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.6.s"},[{"#n":"$r2"}],"^是什么？”","\n","^“字面意思上，会给认知者带来危害。总之，接下来你需要佩戴。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-2":["\n","^左手已经戴了表，扣不上。","\n",["ev","str","^摘下来","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^再试试？","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["^ ",{"->":"1_2.conversation"},"\n",{"->":".^.^.^.^.^.loop"},{"#f":5}],"c-1":["\n",{"->":".^.^.^.^.^.loop"},{"#f":5}]}],{"#f":5}],"c-3":["^ ",{"->":"1_2.conversation"},"\n",{"->":".^.^.^.loop"},{"#f":5}],"#f":5,"#n":"opts"}],{"loop":["ev",{"CNT?":".^.^.opts.c-2"},2,">","/ev",[{"->":".^.b","c":true},{"b":["\n",{"->":"1_2.break_wearable"},{"->":".^.^.^.7"},null]}],[{"->":".^.b"},{"b":["\n",{"->":".^.^.^.^.opts"},{"->":".^.^.^.7"},null]}],"nop","\n",{"#f":5}]}],{"#f":1}],"break_wearable":[["^你用力一扯，带子断了。","\n","^……","\n","ev","str","^看向 Dgeros","/str","/ev",{"*":".^.c-0","flg":20},{"c-0":["\n","^“这个能不能修一下。”","\n","^Dgeros 深深地看了你一眼，然后打开了电脑。","\n","^你看见一片花花绿绿的东西闪过。","\n",{"->":"1_2.conversation"},{"#f":5}]}],{"#f":1}],"conversation":[["^<hr>","\n","^“在测试开始前，你想问些什么？我大体介绍一下，细节以后再说。”","\n",[["ev",{"^->":"1_2.conversation.0.opts.0.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^“你们这个组织叫什么？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.conversation.0.opts.1.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":18},{"s":["^“你们是做什么的？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.conversation.0.opts.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-2","flg":19},{"s":["^“你们对于世界持有怎样的态度？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.conversation.0.opts.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-3","flg":19},{"s":["^“我们有哪些同行组织？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.conversation.0.opts.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-4","flg":18},{"s":["^“如果测试未通过会怎么样？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.conversation.0.opts.5.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-5","flg":18},{"s":["^“没问题了。”",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"1_2.conversation.0.opts.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.0.s"},[{"#n":"$r2"}],"\n","^“<span class=\"ruby\">特殊收容措施基金会（SCP 基金会）<span class=\"rt\">Special Containment Procedures Foundation</span></span>。”","\n","^<img src=\"https://scp-wiki.wdfiles.com/local--files/theme%3Abasalt/basalt_scp_logo-for_lightmode.svg\"/>","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-1":["ev",{"^->":"1_2.conversation.0.opts.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.1.s"},[{"#n":"$r2"}],"\n","^“我们以<span class=\"ruby\">收容<span class=\"rt\">Secure</span></span>、<span class=\"ruby\">控制<span class=\"rt\">Contain</span></span>、<span class=\"ruby\">保护<span class=\"rt\">Protect</span></span>为宗旨，其对象是被我们称之为收容物/SCP 的……东西。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-2":["ev",{"^->":"1_2.conversation.0.opts.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","^“我们所做的被称作‘必要之恶’。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-3":["ev",{"^->":"1_2.conversation.0.opts.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n","^“其实还挺多……我们最大的同行组织是<span class=\"ruby\">全球超自然联盟（GOC）<span class=\"rt\">Global Occult Coalition</span></span>。”","\n","^<img src=\"https://scp-wiki.wdfiles.com/local--files/goc-hub-page/GOC-Logo-v4.png\"/>","\n","^“他们由 GOC 部门与 108 议会构成，游离在纯粹自由组织与个体政治组织之间；强项在于奇术。而我们比他们更加「超自然」。”","\n","^“其它还有蛇之手、欲肉教、破碎之神教会、地平线倡议、混沌分裂者等等。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-4":["ev",{"^->":"1_2.conversation.0.opts.c-4.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n","^“我们会处理好你的记忆。”","\n",{"->":".^.^.^.loop"},{"#f":5}],"c-5":["ev",{"^->":"1_2.conversation.0.opts.c-5.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.5.s"},[{"#n":"$r2"}],"\n","ev",{"CNT?":".^.^.c-0"},1,"!=","/ev",[{"->":".^.b","c":true},{"b":["\n","^“你确定没问题？”","\n",{"->":"u_end_why"},{"->":".^.^.^.13"},null]}],"nop","\n",{"->":".^.^.^.loop.break"},{"->":".^.^.^.loop"},{"#f":5}],"#f":5,"#n":"opts"}],{"loop":[{"->":".^.^.opts"},[{"->":"1_2.test1"},{"#f":5,"#n":"break"}],{"#f":5}]}],{"#f":1}],"test1":[["^.",{"#":"CHECKPOINT: set"},"\n","^你进入了一个房间。唯一的光源是天花板上有些昏暗的灯光，房间中央有一张桌子，上面摆放了一个棋盘和几排棋子。","\n","^<hr>","\n","^“我们现在开始第一项测试。这把枪可以塞入普通子弹，在使用时思考你见过的生物的名字，就可以杀死它。”","\n","^“请用此枪杀死附身在棋子上的恶灵。”","\n",{"#":"SCRIPT: include: script/chess/chess_base.js"},{"#":"SCRIPT: include: script/chess/catchess.js"},{"#":"SCRIPT: include: script/extra/catchess_test.js"},["ev",{"^->":"1_2.test1.0.14.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^“那如果重名会发生什么？”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.test1.0.15.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":18},{"s":["^“……”",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"1_2.test1.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.14.s"},[{"#n":"$r2"}],"\n","^“你猜猜看。”","\n",{"->":".^.^.g-0"},{"#f":5}],"c-1":["ev",{"^->":"1_2.test1.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.15.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.g-0"},{"#f":5}],"g-0":[{"#":"SCRIPT: catchess_test: init"},{"#":"INPUT: t_target_name"},"ev","str","^确定","/str","/ev",{"*":".^.c-2","flg":4},{"c-2":["\n",{"#":"SCRIPT: catchess_test: check"},"^.","\n","ev",{"VAR?":"t_target_name"},"str","^.*","/str","==","/ev",[{"->":".^.b","c":true},{"b":["\n",{"#":"AWARD: give regex_master"},"^“你为什么会觉得它支持正则表达式呢？”","\n",{"->":"1_2.fail"},{"->":".^.^.^.12"},null]}],"nop","\n","ev",{"VAR?":"t_target_name"},"str","^Dgeros","/str","==","/ev",[{"->":".^.b","c":true},{"b":["\n","ev",{"CNT?":".^.^.^.^.^.c-0"},"/ev",[{"->":".^.b","c":true},{"b":["\n","^“猜好了吗，重名会发生什么？”","\n",{"->":".^.^.^.5"},null]}],"nop","\n","^“你觉得，有没有一种可能，我的描述其实是严重夸大的。”","\n",{"->":"u_end_demonify"},{"->":".^.^.^.22"},null]}],"nop","\n","ev",{"VAR?":"t_target_name"},{"VAR?":"t_password"},"==","/ev",[{"->":".^.b","c":true},{"b":["\n","ev",{"VAR?":"t_check"},"/ev",[{"->":".^.b","c":true},{"b":["\n",{"->":"1_2.test2"},{"->":".^.^.^.5"},null]}],"nop","\n","^恶灵附身在了另一颗棋子上。","\n","^你失败了。","\n",{"->":"1_2.fail"},{"->":".^.^.^.30"},null]}],"nop","\n",{"->":"1_2.fail"},{"#f":5}],"#f":5}]}],{"#f":1}],"test2":["^.",{"#":"CHECKPOINT: set"},"\n","^“第二项测试是：调查”","\n",{"->":"1_2.done"},{"#f":1}],"caught_pataphysics":[["^<hr>","\n","^“欢迎来到超形上学部。”","\n","^“或许你会好奇为什么你没有杀死那位存在，可能是因为无限嵌入叙事层、<span class=\"ruby\">回旋跨层<span class=\"rt\">cyclical-transgression</span></span>或者<span class=\"ruby\">亚叙事层<span class=\"rt\">sub-diegesis</span></span>理论，或者，只是因为「设定」中那个枪是虚假描述的而已。”","\n",["ev",{"^->":"1_2.caught_pataphysics.0.6.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^“你这‘超形上学’明明是实在论，是前反思的！……”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.caught_pataphysics.0.7.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^“但是我的本体和那位存在在同一层。”",{"->":"$r","var":true},null]}],["ev",{"^->":"1_2.caught_pataphysics.0.8.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-2","flg":2},{"s":["^“……”",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"1_2.caught_pataphysics.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.6.s"},[{"#n":"$r2"}],"\n","^“……”","\n",{"->":".^.^.g-0"},{"#f":5}],"c-1":["ev",{"^->":"1_2.caught_pataphysics.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.7.s"},[{"#n":"$r2"}],"\n","^“……”","\n",{"->":".^.^.g-0"},{"#f":5}],"c-2":["ev",{"^->":"1_2.caught_pataphysics.0.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.8.s"},[{"#n":"$r2"}],"\n","^“不过这都不重要，总之……”","\n",{"->":".^.^.g-0"},{"#f":5}],"g-0":[{"->":"r_end_experimented"},{"#f":5}]}],{"#f":1}],"fail":[{"->":"u_end_fail"},{"#f":1}],"fail2":["^不幸的是，恶灵在你操作棋子时附身了你。","\n",{"->":"u_end_die_early"},{"#f":1}],"done":[{"->":"to_be_continued"},{"#f":1}],"#f":1}],"ending":[{"#":"APPEAR: main-title"},{"->":".^.choice"},{"choice":[["ev","str","^重新开始","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^回退到重要节点","/str","/ev",{"*":".^.c-1","flg":4},"ev","str","^结束","/str","/ev",{"*":".^.c-2","flg":4},{"c-0":["\n",{"#":"RESTART"},"done",{"#f":5}],"c-1":["\n",{"#":"CHECKPOINT: jump"},"done",{"#f":5}],"c-2":["^ ","\n","^结束会抹除所有统计数据，确定继续吗？ ",{"#":"CLASS: warning"},"\n",["ev","str","^确定","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^取消","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["^ ","end","\n",{"#f":5}],"c-1":["^ ",{"->":".^.^.^.^.^"},"\n",{"#f":5}]}],{"#f":5}]}],{"#f":1}],"#f":1}],"to_be_continued":["^未完待续","\n",{"->":"ending"},{"#f":1}],"c_end_escape":["^退场 ",{"#":"END: common"},"\n","^我们生活在一个名为无知的平静小岛上，被无穷无尽的黑色海洋包围，而我们本就不该扬帆远航。——H.P.Lovecraft ",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"c_end_give_up_halfway":["^半途而废 ",{"#":"END: common"},"\n",{"->":"ending"},{"#f":1}],"c_end_time_limit_exceeded":["^来不及了 ",{"#":"END: common"},"\n",{"->":"ending"},{"#f":1}],"c_end_too_late":["^太晚了 ",{"#":"END: common"},"\n",{"->":"ending"},{"#f":1}],"c_end_why":["^为什么 ",{"#":"END: common"},"\n","^或许，你应该直面什么？ ",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"u_end_backfire":["^反噬 ",{"#":"END: unusual"},"\n","^你高估了自己的承受能力。 ",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"u_end_demonify":["^走火入魔 ",{"#":"END: unusual"},"\n","^至少不是现在。",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"u_end_die_early":["^出师未捷身先死 ",{"#":"END: unusual"},"\n",{"->":"ending"},{"#f":1}],"u_end_dream":["^浮生一梦 ",{"#":"END: unusual"},"\n","^不失为一个选择。又或许，有办法继续推进？ ",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"u_end_fail":["^失败 ",{"#":"END: unusual"},"\n",{"->":"ending"},{"#f":1}],"u_end_martyrdom":["^殉道 ",{"#":"END: unusual"},"\n",{"->":"ending"},{"#f":1}],"u_end_suiside":["^自杀 ",{"#":"END: unusual"},"\n",{"->":"ending"},{"#f":1}],"u_end_too_observable":["^你知道的太多了 ",{"#":"END: unusual"},"\n","^死人才可以保守秘密……一般情况下 ",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"u_end_why":["^为什么 ",{"#":"END: unusual"},"\n","^这是一个通用的结局 ",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"r_end_experimented":["^成为实验品 ",{"#":"END: rare"},"\n",{"->":"ending"},{"#f":1}],"r_end_god_name":["^不可妄称神的名 ",{"#":"END: rare"},"\n","^不要作死。 ",{"#":"CLASS: help"},"\n",{"->":"ending"},{"#f":1}],"global decl":["ev","str","^v0.1.1","/str",{"VAR=":"VERSION"},"str","^","/str",{"VAR=":"chapter"},"str","^Anonymous","/str",{"VAR=":"player_name"},true,{"VAR=":"t_check"},"str","^","/str",{"VAR=":"t_password"},0,{"VAR=":"t_random"},"str","^","/str",{"VAR=":"t_target_name"},"/ev","end",null],"#f":1}],"listDefs":{}};