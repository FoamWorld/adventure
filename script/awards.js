fetch_data("awards");
tagOptions["AWARD"] = function (val) { // option name
    let args = val.split(' ')
    let type = args.shift(1)
    if (type == "give") {
        statistics["award"][args[0]] = true
    }
    else console.error(`AWARD 标签没有命令 ${type}`)
}

function display_awards() {
    if (dataset["awards"] == undefined) return noticeable("awards 数据未加载")
    let awards = statistics["award"]
    let ul = document.createElement("ul")
    for (let key in awards) {
        let li = document.createElement("li")
        li.innerText = dataset["awards"][key].text
        ul.append(li)
    }
    return ul
}
