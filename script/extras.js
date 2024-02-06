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

tagOptions.script = function (val) {
	let vec = val.split(':', 2)
	let name = vec[0].trim()
	let f = extraScripts[name]
	if (f == undefined) {
		let msg = `扩展 ${name} 未引入`
		console.error(msg)
		putNotification(msg, function (_) {
			try {
				extraScripts.include(`script/extra/${name}.js`)
			} catch (e) { putNotification(e) }
		})
	}
	else
		f(vec[1].trim())
}
