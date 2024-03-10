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
        putNotification("无法打开保存的状态", { "确定": null })
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
        let resolveStatus = false
        if (savedVersion != currentVersion) {
            putNotification(`存档版本 ${savedVersion} 与当前版本 ${currentVersion} 不匹配`, {
                "强制加载": null,
                "强制加载与更新": function () {
                    resolveStatus = true
                },
                "取消加载": function () {
                    throw ("加载被拒绝")
                }
            })
        }
        if (resolveStatus) {
            localStorage.setItem(`${PROJECT_NAME}-version`, currentVersion)
        }
        let savedState = localStorage.getItem(`${PROJECT_NAME}-save-state`)
        if (savedState) story.state.LoadJson(savedState)
        contactVar = JSON.parse(localStorage.getItem(`${PROJECT_NAME}-contact`))
        merge(statistics, JSON.parse(localStorage.getItem(`${PROJECT_NAME}-statistics`)))
        return true
    }
    catch (e) {
        putNotification("无法打开保存的状态", { "确定": null })
    }
    return false
}

function setupTheme(globalTagTheme) {
    var savedTheme = localStorage.getItem('ink-theme')

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
            putNotification(e)
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
