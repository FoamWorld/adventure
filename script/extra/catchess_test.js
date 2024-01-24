extraScripts["catchess_test"] = function (command) {
	if (command == "init") {
		let cvs = document.createElement("canvas")
		cvs.id = "canvas"
		cvs.width = 512
		cvs.height = 512
		$("#story").append(cvs)
		let board = catchessRules.__init__()
		initialize_chess(board, cvs)
		get_var("t_password").value = crypto.randomUUID()
	}
}
