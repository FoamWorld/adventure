const PROJECT_NAME = "adventure";
var dataset = {};
fetch("assets/data/awards.json")
    .then(response => {
        if (!response.ok) {
            console.error("HTTP error " + response.status)
            return null
        }
        return response.json()
    })
    .then(data => {
        dataset["awards"] = data
    });

var varBoard = {};
var extraScriptsLoaded = new Set()
var extraScripts = {
    "include": function (path) {
        if (extraScriptsLoaded.has(path)) return
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
    end: {
        common: new Set(), unusual: new Set(),
        rare: new Set(), epic: new Set(),
        legendary: new Set(), mythic: new Set(),
        bad: new Set(), good: new Set(), true: new Set(),
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
var checkPoint;
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
}

(function (storyContent) {
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

        // Don't over-scroll past new content
        var previousBottomEdge = firstTime ? 0 : contentBottomEdgeY();

        var prependChoices = []
        var activeList = null
        var choiceAfter = []
        // Generate story text - loop through available content
        while (story.canContinue) {

            // Get ink to generate the next paragraph
            var paragraphText = story.Continue();
            var tags = story.currentTags;

            var customClasses = []
            var appendList = []
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];

                // Detect tags of the form "X: Y"
                var splitTag = splitPropertyTag(tag);

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
                    if ('audio' in this) {
                        this.audio.pause();
                        this.audio.removeAttribute('src');
                        this.audio.load();
                    }
                    this.audio = new Audio(splitTag.val);
                    this.audio.play();
                }
                // AUDIOLOOP: src
                else if (splitTag && splitTag.property == "AUDIOLOOP") {
                    if ('audioLoop' in this) {
                        this.audioLoop.pause();
                        this.audioLoop.removeAttribute('src');
                        this.audioLoop.load();
                    }
                    this.audioLoop = new Audio(splitTag.val);
                    this.audioLoop.play();
                    this.audioLoop.loop = true;
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
                        if (contactVar["processShiny"]) {
                            let noti = createQElement("p", { className: "neon", innerText: "#CHECKPOINT#" })
                            noti.style.textAlign = "center"
                            appendList.push(noti)
                        }
                    }
                    else if (splitTag.val == "jump") {
                        backCheckPoint()
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
                    customClasses.push(splitTag.val + "-end")
                    statistics.end[splitTag.val].add(paragraphText.trim())
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
                        let text = value === undefined ? "%RANDOM%" : `%RANDOM: ${value}%`
                        let noti = createQElement("p", { className: "neon", innerText: text })
                        noti.style.textAlign = "center"
                        appendList.push(noti)
                    }
                }
                // RESTART
                else if (tag == "RESTART") {
                    restart()
                    return
                }
                // SCRIPT: oper name
                else if (splitTag && splitTag.property == "SCRIPT") {
                    let vec = splitTag.val.split(':', 2)
                    extraScripts[vec[0].trim()](vec[1].trim())
                }
                // SET: varname
                else if (splitTag && splitTag.property == "SET") {
                    let vec = splitTag.val.split(' ', 2)
                    contactVar[vec[0]] = JSON.parse(vec[1])
                }
                // UPCOMMENT: text
                else if (splitTag && splitTag.property == "UPCOMMENT") {
                    let t1 = paragraphText
                    let t2 = splitTag.val
                    paragraphText = ""
                    let span = document.createElement("span")
                    span.className = "ruby"
                    span.innerText = t1
                    let rt = document.createElement("span")
                    rt.className = "rt"
                    rt.innerText = t2
                    span.append(rt)
                    appendList.push(span)
                }
            }

            // Create paragraph element (initially hidden)
            var paragraphElement = document.createElement('p')
            paragraphElement.innerHTML = paragraphText
            for (let t of appendList)
                paragraphElement.appendChild(t)

            for (var i = 0; i < customClasses.length; i++)
                paragraphElement.classList.add(customClasses[i])

            if (activeList == null)
                storyContainer.appendChild(paragraphElement)
            else {
                let li = createQElement("li")
                li.append(paragraphElement)
                activeList.append(li)
            }

            delay += complexDelay(delay, paragraphElement)
        }

        for (let i of prependChoices)
            storyContainer.appendChild(i)

        // Create HTML choices from ink choices
        let choiceNum = story.currentChoices.length
        let isInstant = contactVar["optionSpeed"] == "instant" || choiceNum > 8
        story.currentChoices.forEach(function (choice) {

            // Create paragraph with anchor element
            var choiceParagraphElement = document.createElement('p');
            choiceParagraphElement.classList.add("choice");
            choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
            storyContainer.appendChild(choiceParagraphElement);

            // delay
            showAfter(delay, choiceParagraphElement)
            if (isInstant)
                delay += contactVar["optionSpeed"]

            // Click on choice
            var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
            choiceAnchorEl.addEventListener("click", function (event) {

                // Don't follow <a> link
                event.preventDefault();

                // Remove all existing choices
                removeAll(".choice");

                // Tell the story where to go next
                story.ChooseChoiceIndex(choice.index);

                // This is where the save button will save from
                savePoint = story.state.toJson();
                for (let f of choiceAfter)
                    f()

                // Aaand loop
                continueStory();
            });
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

    // -----------------------------------
    // Various Helper functions
    // -----------------------------------

    function complexDelay(delay, el) {
        let del = contactVar["textSpeed"]
        if (del == "instant")
            return 0.0
        else {
            showAfter(delay, el)
            return del
        }
    }

    function describe_set(set) {
        let l = set.size
        if (l == 0)
            return "无"
        let v = "", count = 0
        for (let i of set.values()) {
            count += 1
            v = v + i
            if (count != l)
                v += "，"
        }
        return v
    }

    function display_awards(container) {
        let awards = statistics["award"]
        let ul = document.createElement("ul")
        for (let key in awards) {
            let li = document.createElement("li")
            li.innerText = key
            ul.append(li)
        }
        container.push(ul)
    }

    function display_ends(container) {
        let endings = statistics["end"]
        let ul = document.createElement("ul")
        for (let key in endings) {
            let keyname = { "common": "普通", "unusual": "正常", "rare": "稀有", "epic": "史诗", "legendary": "传奇", "mythic": "神话", "bad": "坏", "good": "好", "true": "真" }[key] + "结局："
            let li = document.createElement("li")
            li.innerText = keyname + describe_set(endings[key])
            ul.append(li)
        }
        container.push(ul)
    }

    // Fades in an element after a specified delay
    function showAfter(delay, el) {
        el.classList.add("hide");
        setTimeout(function () { el.classList.remove("hide") }, delay);
    }

    // Scrolls the page down, but no further than the bottom edge of what you could
    // see previously, so it doesn't go too far.
    function scrollDown(previousBottomEdge) {

        // Line up top of screen with the bottom of where the previous content ended
        var target = previousBottomEdge;

        // Can't go further than the very bottom of the page
        var limit = outerScrollContainer.scrollHeight - outerScrollContainer.clientHeight;
        if (target > limit) target = limit;

        var start = outerScrollContainer.scrollTop;

        var dist = target - start;
        var duration = 300 + 300 * dist / 100;
        var startTime = null;
        function step(time) {
            if (startTime == null) startTime = time;
            var t = (time - startTime) / duration;
            var lerp = 3 * t * t - 2 * t * t * t; // ease in/out
            outerScrollContainer.scrollTo(0, (1.0 - lerp) * start + lerp * target);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // The Y coordinate of the bottom end of all the story content, used
    // for growing the container, and deciding how far to scroll.
    function contentBottomEdgeY() {
        var bottomElement = storyContainer.lastElementChild;
        return bottomElement ? bottomElement.offsetTop + bottomElement.offsetHeight : 0;
    }

    // Remove all elements that match the given selector. Used for removing choices after
    // you've picked one, as well as for the CLEAR and RESTART tags.
    function removeAll(selector) {
        var allElements = storyContainer.querySelectorAll(selector);
        for (var i = 0; i < allElements.length; i++) {
            var el = allElements[i];
            el.parentNode.removeChild(el);
        }
    }

    // Used for hiding and showing the header when you CLEAR or RESTART the story respectively.
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

    // Helper for parsing out tags of the form:
    //  # PROPERTY: value
    // e.g. IMAGE: source path
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
            let savedState = getItem(`${PROJECT_NAME}-save-state`)
            if (savedState) {
                story.state.LoadJson(savedState)
                return true
            }
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

        // Check whether the OS/browser is configured for dark mode
        var browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark"
            || (savedTheme == undefined && globalTagTheme === "dark")
            || (savedTheme == undefined && globalTagTheme == undefined && browserDark))
            document.body.classList.add("dark");
    }

    // Used to hook up the functionality for global functionality buttons
    function setupButtons(hasSave) {
        let rewindEl = document.getElementById("rewind");
        if (rewindEl) rewindEl.addEventListener("click", function (event) {
            storyContainer.replaceChildren()
            restart()
        })

        let saveEl = document.getElementById("save")
        if (saveEl) saveEl.addEventListener("click", function (event) {
            try {
                localStorage.setItem(`${PROJECT_NAME}-version`, ink_var("VERSION")).value
                localStorage.setItem(`${PROJECT_NAME}-save-state`, savePoint)
                document.getElementById("reload").removeAttribute("disabled")
                localStorage.setItem('ink-theme', document.body.classList.contains("dark") ? "dark" : "")
            } catch (e) {
                console.warn("无法保存状态")
            }
        })

        let reloadEl = document.getElementById("reload");
        if (!hasSave) {
            reloadEl.setAttribute("disabled", "disabled")
        }
        reloadEl.addEventListener("click", function (event) {
            if (reloadEl.getAttribute("disabled"))
                return

            storyContainer.replaceChildren()
            try {
                let savedVersion = localStorage.getItem(`${PROJECT_NAME}-version`)
                let currentVersion = ink_var("VERSION").value
                if (savedVersion != currentVersion) {
                    let conf = window.confirm(`存档版本 ${savedVersion} 与当前版本 ${currentVersion} 不匹配，是否尝试加载？`)
                    if (!conf) throw ("加载被拒绝")
                }
                let savedState = localStorage.getItem(`${PROJECT_NAME}-save-state`)
                if (savedState) story.state.LoadJson(savedState)
            }
            catch (e) {
                console.debug("无法打开保存的状态")
            }
            continueStory(true);
        });

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

})(storyContent)
