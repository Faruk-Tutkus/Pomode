const minuteDoc = document.getElementById('minute')
const secondDoc = document.getElementById('second')
const startButton = document.getElementById('start')
const restartButton = document.getElementById('restart')
const circle = document.querySelector('.circle')
const pomodoro = document.getElementById('pomodoro')
const shortbreak = document.getElementById('shortbreak')
const longbreak = document.getElementById('longbreak')
const timer = document.querySelector('.timer')
const painel = document.querySelector('.painel')
const plusminuse = document.querySelectorAll('.plusminus')
var minute = 25
var second = 0
var start = false
var interval = null
var mode = 0
var audio = null
var tempMinutePomodoro = 25
var tempMinuteShort = 5
var tempMinuteLong = 15
function audioEffect(url){
    audio = new Audio(url)   
}
for (let index = 0; index < plusminuse.length; index++) {
    plusminuse[index].addEventListener('mousedown', ()=>{
        if (!start) {
            if (index == 0) {
                if (minute < 59) {
                    minute++;
                    if (minute < 10) {
                        minuteDoc.innerHTML = `0${minute}`
                    }
                    else
                        minuteDoc.innerHTML = `${minute}`   
                }
            }
            else if(index == 1){
                if (minute > 1) {
                    minute--;
                    if (minute < 10) {
                        minuteDoc.innerHTML = `0${minute}`
                    }
                    else
                        minuteDoc.innerHTML = `${minute}`
                }
            }
            if (mode == 0) {
                tempMinutePomodoro = minute
            }
            else if(mode == 1) {
                tempMinuteShort = minute
            }
            else if(mode == 2) {
                tempMinuteLong = minute
            }
        }
    })
}
startButton.onclick = ()=>{
    if (!start) {
        interval = window.setInterval(Timer ,1000)
        startButton.innerHTML = `<i class="fa-solid fa-pause"></i>`
        start = true
        for (let index = 0; index < plusminuse.length; index++) {
            plusminuse[index].style.opacity = 0.5
        }
    }
    else if (start && minute != 0 || second != 0) {
        startButton.innerHTML = `<i class="fa-solid fa-play"></i>`
        for (let index = 0; index < plusminuse.length; index++) {
            plusminuse[index].style.opacity = 1
        }
        start = false
        clearInterval(interval)
    }
    audioEffect('soundClick.mp3')
    audio.volume = 0.025
    audio.play()
}
restartButton.onclick = ()=>{
    if (start || minute != 0 || second != 0) {
        if (mode == 0) {
            Mode(mode, '#1f2241', '#393e79', '#ffffffe6','#ee7276','#ffffffe6')
        }
        else if (mode == 1) {
            Mode(mode, '#1f3341', '#395e79', '#ee7276', '#ffffffe6', '#ffffffe6')
        }
        else if (mode == 2) {
            Mode(mode, '#1f3c41', '#396f79', '#ffffffe6', '#ffffffe6', '#ee7276')
        }
    }
    audioEffect('soundClick.mp3')
    audio.volume = 0.025
    audio.play()
    
}
var hue = 360
function Timer() {
    if (second > 0) {
        second--;
    }
    else {
        second = 59
        minute--
    }
    if (second < 10) {
        secondDoc.innerHTML = `0${second}`
    }
    else
        secondDoc.innerHTML = `${second}`

    if (minute < 10) {
        minuteDoc.innerHTML = `0${minute}`
    }
    else
        minuteDoc.innerHTML = `${minute}`

    circle.style.backgroundColor = 'hsl('+hue--+', 78%, 69%)'
    if (hue == 0) {
        hue = 360
    }
    if (minute == 0 && second == 0 && mode == 0) {
        circle.style.backgroundColor = `#ee7276`
        startButton.innerHTML = `<i class="fa-solid fa-play"></i>`
        mode = 1
        Mode(mode, '#1f3341', '#395e79', '#ee7276', '#ffffffe6', '#ffffffe6')
        audioEffect('soundTimer.wav')
        audio.volume = 0.007
        audio.play()
    }
    else if(minute == 0 && second == 0 && mode == 1){
        circle.style.backgroundColor = `#ee7276`
        startButton.innerHTML = `<i class="fa-solid fa-play"></i>`
        mode = 0
        Mode(mode, '#1f2241', '#393e79', '#ffffffe6','#ee7276','#ffffffe6')
        audioEffect('soundTimer.wav')
        audio.volume = 0.007
        audio.play()
    }
    else if(minute == 0 && second == 0 && mode == 2) {
        circle.style.backgroundColor = `#ee7276`
        startButton.innerHTML = `<i class="fa-solid fa-play"></i>`
        mode = 0
        Mode(mode, '#1f2241', '#393e79', '#ffffffe6','#ee7276','#ffffffe6')
        audioEffect('soundTimer.wav')
        audio.volume = 0.007
        audio.play()
    }
}
pomodoro.addEventListener('click', ()=>{
    mode = 0
    Mode(mode, '#1f2241', '#393e79', '#ffffffe6','#ee7276','#ffffffe6')
})
shortbreak.addEventListener('click', ()=>{
    mode = 1
    Mode(mode, '#1f3341', '#395e79', '#ee7276', '#ffffffe6', '#ffffffe6')
})
longbreak.addEventListener('click', ()=>{
    mode = 2
    Mode(mode, '#1f3c41', '#396f79', '#ffffffe6', '#ffffffe6', '#ee7276')
})
function Mode(mode, bodyColor, shadowColor, shortColor, pomodorColor, longColor){
    clearInterval(interval)
    for (let index = 0; index < plusminuse.length; index++) {
        plusminuse[index].style.opacity = 1
    }
    circle.style.backgroundColor = '#ee7276'
    startButton.innerHTML = `<i class="fa-solid fa-play"></i>`
    document.body.style.backgroundColor = bodyColor
    circle.style.setProperty("--color-primary", bodyColor)
    timer.style.boxShadow = `0px 0px 10px 10px ${shadowColor}`
    painel.style.boxShadow = `0px 0px 10px 10px ${shadowColor}`
    shortbreak.style.color = shortColor
    pomodoro.style.color = pomodorColor
    longbreak.style.color = longColor
    hue = 360
    switch (mode) {
        case 0:
            minute = tempMinutePomodoro
            second = 0
            start = false
            secondDoc.innerHTML = `0${second}`
            if (minute >= 10) {
                minuteDoc.innerHTML = `${minute}`
            }
            else
                minuteDoc.innerHTML = `0${minute}`
            break
        case 1:
            minute = tempMinuteShort
            second = 0
            start = false
            secondDoc.innerHTML = `0${second}`
            if (minute >= 10) {
                minuteDoc.innerHTML = `${minute}`
            }
            else
                minuteDoc.innerHTML = `0${minute}`
            break
        case 2:
            minute = tempMinuteLong
            second = 0
            start = false
            secondDoc.innerHTML = `0${second}`
            if (minute >= 10) {
                minuteDoc.innerHTML = `${minute}`
            }
            else
                minuteDoc.innerHTML = `0${minute}`
            break
    }
}