LIST information_ids = CRITICAL_INFO, HIDDEN_INFO, KEY_INFO, INTRODUCTION_INFO

== 1_3 ==
~ chapter = "1-3"
#CLEAR
<h3>03</h3>
<h4>愿俟时乎吾将刈</h4>
<hr>
~ temp time_offset = 0
~ temp current_level = 1
~ temp elev_level = 1
~ temp elev_closed = false
~ temp door_locked = true
~ temp info_collect = ()
~ temp companion_state = "home"
~ temp keyholder_state = "home"

再次检查了观谬维基私信中对方的住址：1201，你步入了一层的大厅。
这里的灯不知为何不够明亮，而且没有窗，大厅里显得很昏黄，不过大的部件还是看得清楚的。

现在的你没有任何特权，还是应该仔细探查一番。

- (hall)
    {current_level > 0:
        {current_level}F 大厅。
    }
    {current_level > 1:
    	楼道里有三扇门。
    }
    + {current_level == 1} [离开建筑]
        {info_collect ? CRITICAL_INFO:
            -> done
        - else:
            你被删除记忆然后赶走了。
            -> frag_escape_without_memory
        }
    + [前往楼梯间] -> stairway
    + [前往电梯间] -> elevway
    + {current_level > 1} [敲门1室]
    	{current_level == 12 and companion_state == "home":
            ~ companion_state = "comp"
    		“你终于来了，我等了好久了。”
            “情况我已经在论坛里都说了，”
            ~ info_collect += INTRODUCTION_INFO
            -> to_be_continued
        - else:
            没有人回应。
    	}
    + {current_level > 1} [敲门2室]
        没有人回应。
    + {current_level > 1} [敲门3室]
        没有人回应。
    - -> hall

- (elevway)
    {elev_level != current_level:
        发着红光的数字显示电梯现在停在{elev_level}F。
    }
    + {elev_level == current_level} [进入电梯]
        ~ elev_closed = false
        -> elevator
    + [回到走廊] -> hall

- (stairway)
    {current_level}F楼梯间，可以上下楼。
    {current_level == 1 and door_locked:
    	另外还有一道门，但是被锁住了。
    }
    + {current_level != 20} [上楼]
        ~ current_level += 1
    	-> stairway
    + {current_level > 1 or (current_level == 1 and !door_locked)} [下楼]
        ~ current_level -= 1
    	-> stairway
    + [前往走廊] -> hall

- (elevator)
    {elev_closed and (info_collect ? CRITICAL_INFO):
        -> eat
    }
    + {elev_closed} [开门]
    	~ elev_closed = false
    + {!elev_closed} [关门]
    	~ elev_closed = true
    + {!elev_closed} [走出电梯]
        -> elevway
    - -> elevator

- (eat)
    你发现电梯内部不知何时变得通红，而且一点点向内挤压。
    {companion_state == "comp":
        -> fail_magic
    - else:
        -> u_end_die_early
    }

- (fail_magic)
    “太上台星 应变无停
    驱邪缚魅 保命护身
    智慧明净 心神安宁
    三魂永久 魄无丧倾”
    随着这坚定的声音……什么也没发生。
    -> u_end_fail

= done
-> to_be_continued
