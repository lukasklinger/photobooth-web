var countdownCount = 0
var shotCount = 0

function start() {
    countdownCount = 3
    shotCount = 0

    countdownTick()
}

function countdownTick() {
    console.log("tick")

    document.querySelector('#startInstructions').style.visibility = 'hidden'
    document.querySelector('#countdown').style.visibility = 'visible'

    document.querySelector('#countdown').textContent = countdownCount

    if (countdownCount != 0) {
        setTimeout(countdownTick, 1000)
    }

    if (countdownCount == 0) {
        document.querySelector('#countdown').style.visibility = 'hidden'
        takeShot()
    }

    countdownCount--
}

function takeShot() {
    console.log("click")

    // take photo
    snapshot()

    // TODO save photo

    shotCount++
    
    if (shotCount <= 3) {
        countdownCount = 3
        setTimeout(1000, countdownTick)
    }

    if (shotCount > 3) {
        document.querySelector('#startInstructions').style.visibility = 'visible'
    }
}