fetch_data("awards", "./assets/data/awards.json");
tagOptions["AWARD"] = function (val) { // option name
    let args = val.split(' ')
    let type = args.shift(1)
    if (type == "give") {
        give_award(args[0])
    }
    else console.error(`AWARD 标签没有命令 ${type}`)
}

function give_award(name) {
    statistics["award"][name] = true
    message_centercover(`🎉获得成就${dataset["awards"][name].title}！`)
}

function display_awards() {
    if (dataset["awards"] == undefined) return noticeable("awards 数据未加载")
    let awards = statistics["award"]
    let ul = document.createElement("ul")
    for (let key in awards) {
        let li = document.createElement("li")
        li.innerText = dataset["awards"][key].title
        ul.append(li)
    }
    return ul
}
