const PROJECT_NAME = "adventure";
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
fetch_data("awards");

var varBoard = {};
var extraScriptsLoaded = new Set()
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

var story;
function ink_var(name) {
    return story.state._variablesState._globalVariables.get(name)
}

// 统计数据
var statistics = {
    award: {},
    end: {},
}
function merge(st, st2) {
    if (st.award == {})
        st.award = st2.award
    else
        for (let key in st2.award)
            if (st.award[key] == undefined || st.award[key] < st2.award[key])
                st.award[key] = st2.award[key]
    if (st.end == {})
        st.end = st2.end
    else
        for (let key in st2.end) {
            let lo = st2.end[key]
            if (st.end[key] == undefined)
                st.end[key] = lo
            else
                for (let key2 in low)
                    if (st.end[key][key2] == undefined || st.end[key][key2] < st2.end[key][key2])
                        st.end[key][key2] = st2.end[key][key2]
        }
}

// 可设置数据
var contactVar = {
    displayImage: true,
    optionSpeed: 200.0,
    player: {},
    processShiny: false,
    randomMode: "normal",
    textSpeed: 200.0,
}

/* 保存点
 + contactVar
 + ink_var("VERSION").value
 + story.state
 - statistics
 - theme
 */
function packSavePoint() {
    return {
        contactVar: JSON.stringify(contactVar),
        savedState: story.state.toJson(),
        savedVersion: ink_var("VERSION").value,
    }
}
function unpackSavePoint(json) {
    contactVar = JSON.parse(json.contactVar)
    story.ResetState()
    story.state.LoadJson(json.savedState)
}
function saveExtra() {
    localStorage.setItem('ink-theme', document.body.classList.contains("dark") ? "dark" : "")
    localStorage.setItem(`${PROJECT_NAME}-statistics`, JSON.stringify(statistics))
}

var checkPoint;
function backCheckPoint() {
    if (!(checkPoint instanceof Object)) return
    storyContainer.replaceChildren()
    try {
        unpackSavePoint(checkPoint)
    }
    catch (e) {
        console.debug("无法打开保存的状态")
    }
    continueStory(true)
    outerScrollContainer.scrollTo(0, 0)
}

/* * * Main * * */
story = new inkjs.Story(storyContent)
var savePoint = ""
let globalTagTheme

// var globalTags = story.globalTags
var storyContainer = document.querySelector('#story')
var outerScrollContainer = document.querySelector('.outerContainer')

setupTheme(globalTagTheme)
var hasSave = loadSavePoint()
setupButtons(hasSave)
savePoint = story.state.toJson()
continueStory(true)

function continueStory(firstTime) {

    var paragraphIndex = 0;
    var delay = 0.0;

    var previousBottomEdge = firstTime ? 0 : contentBottomEdgeY();

    var prependChoices = []
    var activeList = null
    var choiceAfter = []
    while (story.canContinue) {
        var paragraphText = story.Continue();
        var tags = story.currentTags;

        var customClasses = []
        var appendList = []
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i]
            var splitTag = splitPropertyTag(tag)

            // APPEAR: situation
            if (splitTag && splitTag.property == "APPEAR") {
                if (splitTag.val == "main-title") {
                    let div = createQElement("div", { className: "header" })
                    div.append(
                        createQElement("h1", { innerText: "Adventure" }),
                        createQElement("h2", { className: "byline", innerText: "by Rratic" })
                    )
                    storyContainer.prepend(div)
                }
            }
            // AUDIO: src
            else if (splitTag && splitTag.property == "AUDIO") {
                if ('audio' in varBoard) {
                    varBoard.audio.pause()
                    varBoard.audio.removeAttribute('src')
                    varBoard.audio.load()
                }
                varBoard.audio = new Audio(splitTag.val)
                varBoard.audio.play()
            }
            // AUDIOLOOP: src
            else if (splitTag && splitTag.property == "AUDIOLOOP") {
                if ('audioLoop' in varBoard) {
                    varBoard.audioLoop.pause()
                    varBoard.audioLoop.removeAttribute('src')
                    varBoard.audioLoop.load()
                }
                varBoard.audioLoop = new Audio(splitTag.val)
                varBoard.audioLoop.play()
                varBoard.audioLoop.loop = true
            }
            // AWARD: command name
            else if (splitTag && splitTag.property == "AWARD") {
                let args = splitTag.val.split(' ')
                let type = args.shift(1)
                if (type == "give")
                    statistics["award"][args[0]] = true
            }
            // BACKGROUND: src
            else if (splitTag && splitTag.property == "BACKGROUND") {
                outerScrollContainer.style.backgroundImage = 'url(' + splitTag.val + ')';
            }
            // CHECKPOINT
            else if (splitTag && splitTag.property == "CHECKPOINT") {
                if (splitTag.val == "set") {
                    checkPoint = packSavePoint()
                    document.getElementById("backwards").removeAttribute("disabled")
                    if (contactVar["processShiny"]) {
                        appendList.push(noticeable("#CHECKPOINT#"))
                    }
                }
                else if (splitTag.val == "jump") {
                    backCheckPoint()
                    return
                }
            }
            // CLASS: className
            else if (splitTag && splitTag.property == "CLASS") {
                customClasses.push(splitTag.val);
            }
            // CLEAR
            else if (tag == "CLEAR") {
                storyContainer.replaceChildren()
            }
            // DELAY: time
            else if (splitTag && splitTag.property == "DELAY") {
                delay += new Number(splitTag.val)
            }
            // DISPLAY: varname
            else if (splitTag && splitTag.property == "DISPLAY") {
                appendList.push(createQElement("h2", { innerText: splitTag.val }))
                if (splitTag.val == "ends")
                    display_ends(appendList)
                else if (splitTag.val == "awards")
                    display_awards(appendList)
            }
            // END: type
            else if (splitTag && splitTag.property == "END") {
                storyContainer.appendChild(document.createElement("hr"))
                let type = splitTag.val
                let name = paragraphText.trim()
                customClasses.push(type + "-end")
                if (statistics.end[type] == undefined)
                    statistics.end[type] = {}
                if (statistics.end[type][name] == undefined)
                    statistics.end[type][name] = 1
                else
                    statistics.end[type][name] += 1
            }
            // INPUT: varname
            else if (splitTag && splitTag.property == "INPUT") {
                let input = document.createElement("input")
                input.type = "text"
                input.className = "input"
                input.value = ink_var(splitTag.val).value
                input.placeholder = "input"
                prependChoices.push(input)
                choiceAfter.push(function () {
                    ink_var(splitTag.val).value = input.value
                })
            }
            // IMAGE: src
            if (splitTag && splitTag.property == "IMAGE" && contactVar["displayImage"]) {
                var imageElement = document.createElement('img');
                imageElement.src = splitTag.val;
                storyContainer.appendChild(imageElement);

                delay += complexDelay(delay, paragraphElement)
            }
            // LINK: url
            else if (splitTag && splitTag.property == "LINK") {
                let linkElement = document.createElement('a')
                let url = "https://" + splitTag.val
                linkElement.href = url
                linkElement.target = "_blank"
                linkElement.innerText = url
                appendList.push(linkElement)
            }
            // LINKOPEN: url
            else if (splitTag && splitTag.property == "LINKOPEN") {
                window.open(splitTag.val);
            }
            // LIST: begin/end
            else if (splitTag && splitTag.property == "LIST") {
                if (splitTag.val == "begin") {
                    activeList = createQElement("ul")
                    storyContainer.appendChild(activeList)
                }
                else if (splitTag.val == "end")
                    activeList = null
            }
            // RANDOM: type args...
            else if (splitTag && splitTag.property == "RANDOM") {
                let mode = contactVar["randomMode"]
                let value = undefined
                let args = splitTag.val.split(' ')
                let type = args.shift(1)
                if (mode == "normal") {
                    if (type == "uniform_int_distribution") {
                        value = Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0]
                        ink_var("t_random").value = value
                    }
                }
                else if (mode == "editable") {
                    ink_var("t_random").value = Number(window.prompt(splitTag.val, args[0]))
                }
                if (contactVar["processShiny"]) {
                    appendList.push(noticeable(`%RANDOM: ${value}%`))
                }
            }
            // RESTART
            else if (tag == "RESTART") {
                restart()
                return
            }
            // SCRIPT: name operation
            else if (splitTag && splitTag.property == "SCRIPT") {
                let vec = splitTag.val.split(':', 2)
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
            // SET: varname
            else if (splitTag && splitTag.property == "SET") {
                let vec = splitTag.val.split(' ', 2)
                contactVar[vec[0]] = JSON.parse(vec[1])
            }
        }
        var paragraphElement = document.createElement('p')
        paragraphElement.innerHTML = paragraphText
        for (let t of appendList)
            paragraphElement.appendChild(t)

        for (var i = 0; i < customClasses.length; i++)
            paragraphElement.classList.add(customClasses[i])

        if (activeList == null) {
            if (paragraphText.trim() != "." || appendList.length != 0)
                storyContainer.appendChild(paragraphElement)
        }
        else {
            let li = createQElement("li")
            li.append(paragraphElement)
            activeList.append(li)
        }

        delay += complexDelay(delay, paragraphElement)
    }

    for (let i of prependChoices)
        storyContainer.appendChild(i)

    let choiceNum = story.currentChoices.length
    let isInstant = contactVar["optionSpeed"] == "instant" || choiceNum > 8
    story.currentChoices.forEach(function (choice) {
        var choiceParagraphElement = createQElement("p", { className: "choice" })
        choiceParagraphElement.append(createQElement("a", { href: "#", innerHTML: choice.text }))
        storyContainer.appendChild(choiceParagraphElement)
        showAfter(delay, choiceParagraphElement)
        if (isInstant) delay += contactVar["optionSpeed"]
        var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0]
        choiceAnchorEl.addEventListener("click", function (event) {
            event.preventDefault()
            removeAll(".choice")
            story.ChooseChoiceIndex(choice.index)
            savePoint = story.state.toJson()
            for (let f of choiceAfter) f()
            continueStory()
        })
    });

    if (!firstTime)
        scrollDown(previousBottomEdge);

}

function restart() {
    story.ResetState()
    savePoint = story.state.toJson()
    continueStory(true)
    outerScrollContainer.scrollTo(0, 0)
}

/* * * Helper * * */

function complexDelay(delay, el) {
    let del = contactVar["textSpeed"]
    if (del == "instant")
        return 0.0
    else {
        showAfter(delay, el)
        return del
    }
}

function display_awards(container) {
    let awards = statistics["award"]
    let ul = document.createElement("ul")
    for (let key in awards) {
        let li = document.createElement("li")
        li.innerText = dataset["awards"][key].text
        ul.append(li)
    }
    container.push(ul)
}

function display_ends(container) {
    const types = { "common": "普通", "unusual": "正常", "rare": "稀有", "epic": "史诗", "legendary": "传奇", "mythic": "神话", "bad": "坏", "good": "好", "true": "真" }
    let endings = statistics["end"]
    let ul = document.createElement("ul")
    for (let key in types) {
        if (endings[key] == undefined) continue
        let keyname = types[key] + "结局："
        let li = document.createElement("li")
        li.innerText = keyname + JSON.stringify(endings[key])
        ul.append(li)
    }
    container.push(ul)
}

function showAfter(delay, el) {
    el.classList.add("hide");
    setTimeout(function () { el.classList.remove("hide") }, delay);
}

function scrollDown(previousBottomEdge) {
    var target = previousBottomEdge;

    var limit = outerScrollContainer.scrollHeight - outerScrollContainer.clientHeight;
    if (target > limit) target = limit;

    var start = outerScrollContainer.scrollTop;

    var dist = target - start;
    var duration = 300 + 300 * dist / 100;
    var startTime = null;
    function step(time) {
        if (startTime == null) startTime = time;
        var t = (time - startTime) / duration;
        var lerp = 3 * t * t - 2 * t * t * t;
        outerScrollContainer.scrollTo(0, (1.0 - lerp) * start + lerp * target);
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function contentBottomEdgeY() {
    var bottomElement = storyContainer.lastElementChild;
    return bottomElement ? bottomElement.offsetTop + bottomElement.offsetHeight : 0;
}

function removeAll(selector) {
    var allElements = storyContainer.querySelectorAll(selector);
    for (var i = 0; i < allElements.length; i++) {
        var el = allElements[i];
        el.parentNode.removeChild(el);
    }
}

function setVisible(selector, visible) {
    var allElements = storyContainer.querySelectorAll(selector);
    for (var i = 0; i < allElements.length; i++) {
        var el = allElements[i];
        if (!visible)
            el.classList.add("invisible");
        else
            el.classList.remove("invisible");
    }
}

function splitPropertyTag(tag) {
    var propertySplitIdx = tag.indexOf(":");
    if (propertySplitIdx != null) {
        var property = tag.substr(0, propertySplitIdx).trim();
        var val = tag.substr(propertySplitIdx + 1).trim();
        return {
            property: property,
            val: val
        };
    }

    return null;
}

function loadSavePoint() {
    try {
        let savedVersion = localStorage.getItem(`${PROJECT_NAME}-version`)
        if (savedVersion == undefined) return false
        let currentVersion = ink_var("VERSION").value
        if (savedVersion != currentVersion) {
            let conf = window.confirm(`存档版本 ${savedVersion} 与当前版本 ${currentVersion} 不匹配，是否尝试加载？`)
            if (!conf) throw ("加载被拒绝")
        }
        let savedState = localStorage.getItem(`${PROJECT_NAME}-save-state`)
        if (savedState) story.state.LoadJson(savedState)
        contactVar = JSON.parse(localStorage.getItem(`${PROJECT_NAME}-contact`))
        merge(statistics, JSON.parse(localStorage.getItem(`${PROJECT_NAME}-statistics`)))
        return true
    }
    catch (e) {
        console.debug("无法打开保存的状态")
    }
    return false
}

function setupTheme(globalTagTheme) {
    var savedTheme
    try {
        savedTheme = localStorage.getItem('ink-theme')
    }
    catch (e) {
        console.debug("无法打开保存的状态")
    }

    var browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark"
        || (savedTheme == undefined && globalTagTheme === "dark")
        || (savedTheme == undefined && globalTagTheme == undefined && browserDark))
        document.body.classList.add("dark");
}

function setupButtons(hasSave) {
    let rewindEl = document.getElementById("rewind");
    if (rewindEl) rewindEl.addEventListener("click", function (event) {
        storyContainer.replaceChildren()
        storyContainer.classList.remove("box-hide")
        restart()
    })

    let saveEl = document.getElementById("save")
    if (saveEl) saveEl.addEventListener("click", function (event) {
        try {
            localStorage.setItem(`${PROJECT_NAME}-version`, ink_var("VERSION").value)
            localStorage.setItem(`${PROJECT_NAME}-save-state`, savePoint)
            localStorage.setItem(`${PROJECT_NAME}-contact`, JSON.stringify(contactVar))
            document.getElementById("reload").removeAttribute("disabled")
            saveExtra()
        }
        catch (e) {
            console.error(e)
            putNotification(e)
            console.warn("无法保存状态")
        }
    })

    let reloadEl = document.getElementById("reload");
    if (!hasSave) {
        reloadEl.setAttribute("disabled", "disabled")
    }
    reloadEl.addEventListener("click", function (event) {
        storyContainer.replaceChildren()
        storyContainer.classList.remove("box-hide")
        loadSavePoint()
        continueStory(true)
        outerScrollContainer.scrollTo(0, 0)
    })

    let backwardsEl = document.getElementById("backwards");
    if (checkPoint == undefined) {
        backwardsEl.setAttribute("disabled", "disabled")
    }
    backwardsEl.addEventListener("click", function (event) {
        backCheckPoint()
    })

    let themeSwitchEl = document.getElementById("theme-switch")
    if (themeSwitchEl) themeSwitchEl.addEventListener("click", function (event) {
        document.body.classList.add("switched")
        document.body.classList.toggle("dark")
    })
}
