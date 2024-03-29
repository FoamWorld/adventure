var varBoard = {};
var extraScriptsLoaded = new Set();
var extraScripts = {
	"include": function (path) {
		if (extraScriptsLoaded.has(path)) {
			console.debug(`路径 ${path} 已导入`)
			return
		}
		let script = document.createElement("script")
		script.src = path
		document.body.append(script)
		extraScriptsLoaded.add(path)
	}
};

tagOptions["SCRIPT"] = function (val) {
	let vec = val.split(':', 2)
	let name = vec[0].trim()
	let f = extraScripts[name]
	if (f == undefined) {
		let msg = `扩展 ${name} 未引入`
		putNotification(msg, {
			"导入": function (_) {
				try {
					extraScripts.include(`script/extra/${name}.js`)
				} catch (e) { putNotification(e) }
			},
			"忽略": null
		})
	}
	else
		f(vec[1].trim())
}
