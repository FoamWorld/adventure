tagOptions.end = function (val) {
	storyContainer.appendChild(document.createElement("hr"))
	let name = paragraphText.trim()
	customClasses.push(val + "-end")
	if (statistics.end[val] == undefined)
		statistics.end[val] = {}
	if (statistics.end[val][name] == undefined)
		statistics.end[val][name] = 1
	else
		statistics.end[val][name] += 1
}

function display_endings() {
	const types = { "common": "普通", "unusual": "正常", "rare": "稀有", "epic": "史诗", "legendary": "传奇", "mythic": "神话", "bad": "坏", "good": "好", "true": "真" }
	let endings = statistics["end"]
	let ul = document.createElement("ul")
	for (let key in types) {
		if (endings[key] == undefined) continue
		let keyname = types[key] + "结局："
		let li = document.createElement("li")
		li.innerText = keyname + JSON.stringify(endings[key])
		ul.append(li)
	}
	return ul
}
