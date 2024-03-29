function continueStory(firstTime) {
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
            var tprop = splitTag.property
            var val = splitTag.val
            if (tagOptions[tprop] != undefined) {
                let signal = tagOptions[tprop](val, {
                    appendList: appendList,
                    customClasses: customClasses,
                    paragraphText: paragraphText,
                })
                if (signal == -1) return
                continue
            }
            // CLASS: className
            else if (tprop == "CLASS") {
                customClasses.push(val);
            }
            // DELAY: time
            else if (tprop == "DELAY") {
                delay += new Number(val)
            }
            // DISPLAY: varname
            else if (tprop == "DISPLAY") {
                appendList.push(createQElement("h2", { innerText: val }))
                if (val == "ends")
                    appendList.push(display_endings())
                else if (val == "awards")
                    appendList.push(display_awards())
            }
            // INPUT: varname
            else if (tprop == "INPUT") {
                let input = document.createElement("input")
                input.type = "text"
                input.className = "input"
                input.value = ink_var(val).value
                input.placeholder = "输入"
                prependChoices.push(input)
                choiceAfter.push(function () {
                    ink_var(val).value = input.value
                })
            }
            // LIST: begin/end
            else if (tprop == "LIST") {
                if (val == "begin") {
                    activeList = createQElement("ul")
                    storyContainer.appendChild(activeList)
                }
                else if (val == "end")
                    activeList = null
            }
            // RANDOM: type args...
            else if (tprop == "RANDOM") {
                let mode = contactVar["randomMode"]
                let value = undefined
                let args = val.split(' ')
                let type = args.shift(1)
                let l = Number(args[0])
                let r = Number(args[1])
                if (mode == "normal") {
                    if (type == "uniform_int_distribution") {
                        value = Math.floor(Math.random() * (r - l + 1)) + l
                    }
                    else if (type == "uuid") {
                        value = crypto.randomUUID()
                    }
                    ink_var("t_random").value = value
                }
                else if (mode == "editable") {
                    ink_var("t_random").value = Number(window.prompt(val, l))
                }
                if (contactVar["processShiny"]) {
                    appendList.push(noticeable(`%RANDOM: ${value}%`))
                }
            }
            // SET: varname
            else if (tprop == "SET") {
                let vec = val.split(' ', 2)
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

    if (!firstTime && contactVar["textScroll"]) {
        scrollDown(previousBottomEdge);
    }
}

function restart() {
    story.ResetState()
    savePoint = story.state.toJson()
    continueStory(true)
    outerScrollContainer.scrollTo(0, 0)
}

function complexDelay(delay, el) {
    let del = contactVar["textSpeed"]
    if (del == "instant")
        return 0.0
    else {
        showAfter(delay, el)
        return del
    }
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

function splitPropertyTag(tag) {
    var propertySplitIdx = tag.indexOf(":")
    if (propertySplitIdx >= 0)
        return {
            property: tag.substr(0, propertySplitIdx).trim(),
            val: tag.substr(propertySplitIdx + 1).trim()
        }
    else // -1
        return {
            property: tag,
            val: ""
        }
}
