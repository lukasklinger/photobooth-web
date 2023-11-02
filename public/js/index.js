function init() {
    document.querySelector('#countdown').style.visibility = 'hidden'
    
    startCamera()
    registerKeyboard()
    fetchRoomName()
    createQR()
}