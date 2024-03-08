// 基本的简写方法
function createQElement(tagname, deco = {}) {
	let tag = document.createElement(tagname)
	for (let k of Object.keys(deco)) tag[k] = deco[k]
	return tag
}

function copyable(text) {
	let div = document.createElement("span")
	let span = createQElement("span", { innerText: text, className: "copyable-text" })
	let button = document.createElement("button")
	button.classList.add("fas", "fa-copy", "copy-button")
	button.addEventListener("click", function (_) {
		navigator.clipboard.writeText(text).then(() => {
			button.classList.replace("fa-copy", "fa-check")
			button.disabled = "disabled"
			setTimeout(function () {
				button.classList.replace("fa-check", "fa-copy")
				button.removeAttribute("disabled")
			}, 5000)
		}, function () {
			window.alert("复制失败")
		})
	})
	div.append(span, button)
	return div
}

function inkChoice(text, f) {
	let choice = createQElement("p", { className: "choice" })
	let a = createQElement("a", { href: "#", innerHTML: text })
	choice.appendChild(a)
	a.addEventListener("click", f)
	return choice
}

function message_centercover(html) {
	if (window.layer != undefined) {
		layer.msg(html)
	}
}

function noticeable(text) {
	let noti = createQElement("p", { className: "neon", innerText: text })
	noti.style.textAlign = "center"
	return noti
}

function removeAll(selector) {
	var allElements = storyContainer.querySelectorAll(selector)
	for (var i = 0; i < allElements.length; i++) {
		var el = allElements[i]
		el.parentNode.removeChild(el)
	}
}

tagOptions["TITLE"] = function (val, variables) {
	if (val == "Main" && document.getElementsByClassName("byline").length == 0) {
		let div = createQElement("div", { className: "header" })
		div.append(
			createQElement("h1", { innerText: PROJECT_TITLE }),
			createQElement("h2", { className: "byline", innerText: PROJECT_BYLINE })
		)
		storyContainer.prepend(div)
	}
	else {
		let div = createQElement("div", { className: "help" })
		div.appendChild(createQElement("p", { innerText: val }))
		variables.appendList.push(div)
	}
}
