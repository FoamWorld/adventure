extraScripts["catchess_test"] = function (command) {
	if (command == "init") {
		let maxWidth = document.body.clientWidth
		if (maxWidth > 512)
			maxWidth = 512
		else if (maxWidth < 256)
			maxWidth = 256
		else
			maxWidth = Math.floor(maxWidth / 32) * 32

		let cvs = document.createElement("canvas")
		cvs.id = "canvas"
		cvs.width = maxWidth
		cvs.height = maxWidth + 32
		cvs.style.border = "4px double gold"
		let container = document.createElement("p")
		container.style.display = "flex"
		container.style.justifyContent = "center"
		container.appendChild(cvs)
		document.getElementById("story").appendChild(container)

		let board = catchessRules.__init__()
		let uuid = crypto.randomUUID()

		initialize_chess(board, cvs)
		varBoard["board"] = board
		varBoard["cnt"] = 0
		ink_var("t_password").value = uuid
		cvs.addEventListener("click", function (_) {
			if (varBoard["cnt"] < 0) return
			varBoard["cnt"] += 1
			if (Math.random() * Math.log(varBoard["cnt"]) > 2) {
				varBoard["cnt"] = -1
				let p = document.createElement("p")
				p.innerText = `你发现了一行烟雾状的字：`
				p.append(copyable(uuid))
				document.getElementById("story").append(p)
			}
		})
	}
	else if (command == "check") {
		ink_var("t_check").value = varBoard["board"].count() <= 1
		delete varBoard["board"]
	}
}
