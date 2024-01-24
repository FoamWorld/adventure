extraScripts["catchess_test"] = function (command) {
	if (command == "init") {
		let cvs = document.createElement("canvas")
		cvs.id = "canvas"
		cvs.width = 512
		cvs.height = 512
		$("#story").append(cvs)

		let board = catchessRules.__init__()
		let uuid = crypto.randomUUID()

		initialize_chess(board, cvs)
		varBoard["board"] = board
		ink_var("t_password").value = uuid
	}
	else if (command == "check") {
		ink_var("t_check") = varBoard["board"].count() <= 1
		delete varBoard["board"]
	}
}
