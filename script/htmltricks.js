// 基本的简写方法
function createQElement(tagname, deco = {}) {
	let tag = document.createElement(tagname)
	for (let k of Object.keys(deco)) tag[k] = deco[k]
	return tag
}

function copyable(text) {
	let span = createQElement("span", { innerText: text, className: "copyable" })
	span.addEventListener("click", function (_) {
		navigator.clipboard.writeText(text).then(() => undefined, function () {
			window.alert("复制失败")
		})
	})
	return span
}

function inkChoice(text, f) {
	let choice = createQElement("p", { className: "choice" })
	let a = createQElement("a", { href: "#", innerHTML: text })
	choice.appendChild(a)
	a.addEventListener("click", function (event) { f(event) })
	return choice
}

function noticeable(text) {
	let noti = createQElement("p", { className: "neon", innerText: text })
	noti.style.textAlign = "center"
	return noti
}

function putNotification(content, extraF = undefined) {
	let div = document.createElement("div")
	div.className = "container"
	div.appendChild(createQElement("p", { className: "warning", innerHTML: content }))

	if (extraF != undefined) {
		div.appendChild(inkChoice("处理", function (event) {
			storyContainer.parentNode.removeChild(div)
			storyContainer.classList.remove("box-hide")
			extraF(event)
		}))
	}

	div.appendChild(inkChoice("忽略", function (_) {
		storyContainer.parentNode.removeChild(div)
		storyContainer.classList.remove("box-hide")
	}))

	storyContainer.parentNode.insertBefore(div, storyContainer)
	storyContainer.classList.add("box-hide")
}

function removeAll(selector) {
    var allElements = storyContainer.querySelectorAll(selector)
    for (var i = 0; i < allElements.length; i++) {
        var el = allElements[i]
        el.parentNode.removeChild(el)
    }
}
