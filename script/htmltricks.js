function createQElement(tagname, deco = {}) {
	let tag = document.createElement(tagname)
	for (let k of Object.keys(deco)) tag[k] = deco[k]
	return tag
}

function copyable(text) {
	let span = createQElement("span", { innerText: text, className: "copyyable" })
	span.addEventListener("click", function (_) {
		navigator.clipboard.writeText(text).then(() => undefined, function () {
			window.alert("复制失败")
		})
	})
	return span
}
