const PROJECT_NAME = "adventure";
const PROJECT_TITLE = "Mercury & Milfoil";
const PROJECT_BYLINE = "by Rratic";

if (window.layui != undefined) {
    layui.use(["layer"], function () {
        if (document.readyState != "complete") {
            var layerLoadingId = layer.load(2);
            document.onreadystatechange = function () {
                layer.close(layerLoadingId);
            }
        }
    })
}
else {
    putNotification("layui.js 加载失败")
}

var dataset = {};
function fetch_data(key, path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                let msg = `HTTP Error ${response.status} (${response.statusText})`
                putNotification(msg, {
                    "重新抓取": function () { fetch_data(key, path) },
                    "忽略": null
                })
                return null
            }
            return response.json()
        }, error => {
            putNotification(error.stack)
        })
        .then(data => {
            dataset[key] = data
        })
};

var statistics = {
    award: {},
    end: {},
}

var contactVar = {
    optionScroll: true,
    optionSpeed: 200.0,
    player: {},
    processShiny: false,
    randomMode: "normal",
    textSpeed: 200.0,
}

var story;
function ink_var(name) {
    return story.state._variablesState._globalVariables.get(name)
}
story = new inkjs.Story(storyContent)
// story.globalTags
var storyContainer = document.querySelector('#story')
var outerScrollContainer = document.querySelector('.outerContainer')

var tagOptions = {
    "CLEAR": function () { storyContainer.replaceChildren() },
    "RESTART": function () { restart(); return -1 }
};

class StoryNotification {
    stack
    container
    constructor() {
        this.stack = []
    }
    remove() {
        if (this.stack.length == 0) {
            storyContainer.parentNode.removeChild(this.container)
            storyContainer.classList.remove("box-hide")
        }
        else {
            let obj = this.stack.shift(1)
            this.put(obj.content, obj.methods)
        }
    }
    add(content, methods) {
        if (methods == undefined) methods = { "忽略": null }
        if (this.stack.length == 0) {
            let div = document.createElement("div")
            div.className = "container"
            this.container = div

            this.put(content, methods)
            storyContainer.parentNode.insertBefore(div, storyContainer)
            storyContainer.classList.add("box-hide")
        }
        else {
            this.stack.push({ content: content, methods: methods })
        }
    }
    put(content, methods) {
        let div = this.container
        div.appendChild(createQElement("p", { className: "warning", innerHTML: content }))
        let that = this
        for (let key of Object.keys(methods)) {
            let value = methods[key]
            div.appendChild(inkChoice(key, function (event) {
                that.remove()
                if (value != null) {
                    value(event)
                }
            }))
        }
    }
}
var storyNotification = new StoryNotification();
function putNotification(content, methods) {
    storyNotification.add(content, methods)
}
