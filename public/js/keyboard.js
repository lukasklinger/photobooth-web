function registerKeyboard() {
    document.body.onkeyup = function (e) {
        if (e.key == " " || e.code == "Space") {
            start()
        }
    }
}
