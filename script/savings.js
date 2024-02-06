/*
 + contactVar
 + ink_var("VERSION").value
 + story.state
 - statistics
 - theme
 */
function packSavePoint() {
	return {
		contactVar: JSON.stringify(contactVar),
		savedState: story.state.toJson(),
		savedVersion: ink_var("VERSION").value,
	}
}
function unpackSavePoint(json) {
	contactVar = JSON.parse(json.contactVar)
	story.ResetState()
	story.state.LoadJson(json.savedState)
}
function saveExtra() {
	localStorage.setItem('ink-theme', document.body.classList.contains("dark") ? "dark" : "")
	localStorage.setItem(`${PROJECT_NAME}-statistics`, JSON.stringify(statistics))
}

var checkPoint;
function backCheckPoint() {
	if (!(checkPoint instanceof Object)) return
	storyContainer.replaceChildren()
	try {
		unpackSavePoint(checkPoint)
	}
	catch (e) {
		console.debug("无法打开保存的状态")
	}
	continueStory(true)
	outerScrollContainer.scrollTo(0, 0)
}

function loadSavePoint() {
	try {
		let savedVersion = localStorage.getItem(`${PROJECT_NAME}-version`)
		if (savedVersion == undefined) return false
		let currentVersion = ink_var("VERSION").value
		if (savedVersion != currentVersion) {
			let conf = window.confirm(`存档版本 ${savedVersion} 与当前版本 ${currentVersion} 不匹配，是否尝试加载？`)
			if (!conf) throw ("加载被拒绝")
		}
		let savedState = localStorage.getItem(`${PROJECT_NAME}-save-state`)
		if (savedState) story.state.LoadJson(savedState)
		contactVar = JSON.parse(localStorage.getItem(`${PROJECT_NAME}-contact`))
		merge(statistics, JSON.parse(localStorage.getItem(`${PROJECT_NAME}-statistics`)))
		return true
	}
	catch (e) {
		console.debug("无法打开保存的状态")
	}
	return false
}
