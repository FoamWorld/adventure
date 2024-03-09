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
function fetch_data(key) {
    fetch(`assets/data/${key}.json`)
        .then(response => {
            if (!response.ok) {
                let msg = `HTTP Error ${response.status} (${response.statusText})`
                console.error(msg)
                putNotification(msg, function () { fetch_data(key) })
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
            this.put(obj.content, obj.extraF)
        }
    }
    add(content, extraF = undefined) {
        if (this.stack.length == 0) {
            let div = document.createElement("div")
            div.className = "container"
            this.container = div

            this.put(content, extraF)
            storyContainer.parentNode.insertBefore(div, storyContainer)
            storyContainer.classList.add("box-hide")
        }
        else
            this.stack.push({ content: content, extraF: extraF })
    }
    put(content, extraF) {
        let div = this.container
        div.appendChild(createQElement("p", { className: "warning", innerHTML: content }))
        let that = this
        if (extraF != undefined) {
            div.appendChild(inkChoice("处理", function (event) {
                that.remove()
                extraF(event)
            }))
        }
        div.appendChild(inkChoice("忽略", function (_) {
            that.remove()
        }))
    }
}
var storyNotification = new StoryNotification();
function putNotification(content, extraF = undefined) {
    storyNotification.add(content, extraF)
}
