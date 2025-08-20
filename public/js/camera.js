var w, h;
var capturedPhotos = [];

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

function snapshot() {
    var canvas = document.querySelector("canvas")
    var context = canvas.getContext("2d")
    var video = document.querySelector('#cameraPlayer')

    context.fillRect(0, 0, w, h);
    context.drawImage(video, 0, 0, w, h);

    // Store the current photo as a data URL for later combination
    capturedPhotos.push(canvas.toDataURL("image/png"));
}
window.snapshot = snapshot;

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
window.saveSnapshot = saveSnapshot;

// Combine 4 photos into a single image with 10:15 aspect ratio and whitespace, then upload
function combineAndUploadPhotos() {
    if (capturedPhotos.length !== 4) return;

    // Set output size for landscape (e.g., 1500x1000 for 15:10 aspect)
    var outW = 1500, outH = 1000;
    var padding = 40; // whitespace around and between images
    var innerW = outW - 2 * padding;
    var innerH = outH - 2 * padding;
    var photoW = (innerW - padding) / 2;
    var photoH = (innerH - padding) / 2;

    var canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    var ctx = canvas.getContext('2d');

    // Fill background with white
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, outW, outH);

    // Draw each photo in a 2x2 grid
    for (var i = 0; i < 4; i++) {
        var img = new window.Image();
        img.src = capturedPhotos[i];
        // Closure to ensure correct image is drawn after loading
        (function(img, i) {
            img.onload = function() {
                var x = padding + (i % 2) * (photoW + padding);
                var y = padding + Math.floor(i / 2) * (photoH + padding);
                // Fit image into cell, preserving aspect ratio
                var scale = Math.min(photoW / img.width, photoH / img.height);
                var drawW = img.width * scale;
                var drawH = img.height * scale;
                var offsetX = x + (photoW - drawW) / 2;
                var offsetY = y + (photoH - drawH) / 2;
                ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

                // After last image is drawn, export and upload
                if (i === 3) {
                    setTimeout(function() { // ensure all images are drawn
                        canvas.toBlob(function(blob) {
                            let formData = new FormData();
                            let filename = roomID + "-" + Date.now() + "-photo-combined.png";
                            formData.append('photo', blob, filename);
                            fetch(window.location.href + "upload", {
                                method: 'POST',
                                body: formData
                            }).then(data => {console.log('Combined uploaded', data)});
                        }, 'image/png');
                    }, 100);
                }
            }
        })(img, i);
    }
}
window.combineAndUploadPhotos = combineAndUploadPhotos;
}