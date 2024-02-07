/*
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
tagOptions["CHECKPOINT"] = function (val, variables) {
    if (val == "set") {
        checkPoint = packSavePoint()
        document.getElementById("backwards").removeAttribute("disabled")
        if (contactVar["processShiny"]) {
            variables.appendList.push(noticeable("#CHECKPOINT#"))
        }
    }
    else if (val == "jump") {
        backCheckPoint()
        return -1
    }
}

var savePoint = ""
let globalTagTheme
setupTheme(globalTagTheme)
var hasSave = loadSavePoint()
setupButtons(hasSave)
savePoint = story.state.toJson()
continueStory(true)

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
