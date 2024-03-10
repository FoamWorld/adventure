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
-> hall

= hall
* [前往楼梯间] -> stairway
* [前往电梯间] -> elevway

= elevway
* [进入电梯] -> elevator
* [回到走廊] -> hall

= stairway
* [上楼]
	-> stairway
* [下楼]
	-> stairway
* [回到走廊] -> hall

= elevator
* {elev_closed} [开门]
	~ elev_closed = false
* {!elev_closed} [关门]
	~ elev_closed = true
* {!elev_closed} [走出电梯]
	-> elevway

= fail_magic
“太上台星 应变无停
驱邪缚魅 保命护身
智慧明净 心神安宁
三魂永久 魄无丧倾”
随着这坚定的声音……什么也没发生。

= done
-> to_be_continued
