var w, h;

function startCamera() {
    var video = document.querySelector('#cameraPlayer')
    var canvas = document.querySelector("canvas")

    window.navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
                video.play()

                w = video.videoWidth
                h = video.videoHeight

                canvas.width = w
                canvas.height = h
            }
        })
        .catch(() => {
            alert('Please allow access to the camera.')
        })
}


function snapshot() {
    var canvas = document.querySelector("canvas")
    var context = canvas.getContext("2d")
    var video = document.querySelector('#cameraPlayer')

    context.fillRect(0, 0, w, h);
    context.drawImage(video, 0, 0, w, h);
}