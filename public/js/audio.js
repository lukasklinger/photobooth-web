var iOSAudioFixed = false

function playShutter() {
    let shutterPlayer = document.querySelector('#shutter')

    shutterPlayer.play()
}

function runiOSAudioFix() {
    let shutterPlayer = document.querySelector('#shutter')

    window.addEventListener('touchstart', () => {
        if (!iOSAudioFixed) {
            shutterPlayer.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
            shutterPlayer.play()
            shutterPlayer.src = 'audio/shutter.mp3'
            iOSAudioFixed = true
        }
    })
}