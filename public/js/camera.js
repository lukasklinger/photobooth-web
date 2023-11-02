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

function saveSnapshot() {
    document.querySelector("canvas").toBlob((blob) => {
        let formData = new FormData()
        formData.append('photo', blob, (roomID + "-" + Date.now() + "-photo.png"))

        fetch(window.location.href + "upload", {
            method: 'POST',
            body: formData
        }).then(data => {console.log(data)})
    })
}