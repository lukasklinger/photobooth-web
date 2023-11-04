function init() {
    document.querySelector('#countdown').style.visibility = 'hidden'

    if ('ontouchstart' in window) {
        document.querySelector('#instructionText').textContent = 'Bildschirm antippen um Countdown zu starten'
    } else {
        document.querySelector('#instructionText').textContent = 'Leertaste drücken um Countdown zu starten'
    }

    startCamera()
    registerKeyboard()
    fetchRoomName()
    createQR(200, 200)
}