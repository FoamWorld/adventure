== frag_escape_with_memory ==
你会：
* [缄默] -> c_end_escape
* [公之于众]
    或许太早，或许太晚，迷迷蒙蒙间，一切结束了。
    -> u_end_why



== frag_escape_without_memory ==
#CLEAR
#RANDOM: uniform_int_distribution 1 15
{t_random == 1:
    有一天你突然发现，自己得到了一些碎片的记忆。
    * [置之不理]
    * [求助]
        可是，找谁呢？
}
-> u_end_dream



== frag_road_of_Apex_Tier_Pluripotent_Entity ==
= level_base
你意识到自己要么不全知全能要么不善，并且在创造自己搬不起来的石头上一筹莫展。
你控制不了过去，似乎也接触不到命运。
这一路上有太多的悲剧。
* 不足惜。
* 了却因果。
* ……
-
* [这没有意义]。 -> u_end_suiside
* 没有[意义]「意义」。-> level_allmighty

= level_allmighty
……
你现在可以称自己为“自有的”，因为你控制了存在本身。
可是，你仍然在叙事之塔的塔底。
- (opts)
    * [攀登叙事之塔]
        #RANDOM: uniform_int_distribution 1 3
        {t_random == 1:
            你试着超脱于叙事之塔之外，你成功了。
        }
        你登上了一层，来到了塔底。
    * [应当结束] -> build_prison
- (loop)
    -> opts

= build_prison
你构建了一个闭环，这里没有未知的事物，一切的图景在你面前展开。
* [应当创造]
-
-> c_end_escape

= hidden
欢迎来到此处，真现实的读者。
-> DONE
