var countdownCount = 0
var shotCount = 0

function start() {
    countdownCount = 5
    shotCount = 0

    countdownTick()
}

function countdownTick() {
    console.log("tick")

    document.querySelector('#startInstructions').style.visibility = 'hidden'
    document.querySelector('#qrCodeBox').style.visibility = 'hidden'
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
    playShutter()

    // save photo
    saveSnapshot()

    shotCount++
    
    if (shotCount <= 3) {
        countdownCount = 4
        setTimeout(countdownTick, 1000)
    }

    if (shotCount > 3) {
        document.querySelector('#startInstructions').style.visibility = 'visible'
        document.querySelector('#qrCodeBox').style.visibility = 'visible'
    }
}