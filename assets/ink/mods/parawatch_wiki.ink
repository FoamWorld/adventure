=== load_parawatch_wiki()
	{chapter == "1-2":
		-> must_read
	- else:
		-> page_menu
	}

	= must_read
	#CLEAR
	#IFRAME: parawatch-must-read
	* [阅读完毕] -> page_menu

	= page_menu
	#CLEAR
	#IFRAME: parawatch-homepage
	{chapter == "1-2":
		一番操作后，你在求助区找到了合适的目标。
	}
	* [确定]
	->->
