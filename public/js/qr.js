function createQR(height, width) {
    let url = window.location.href
    url += "photos/" + roomID

    new QRCode("qrcode", {
        text: url,
        width: height,
        height: width,
        colorDark: "#000000",
        colorLight: "#ffffff"
    })
}