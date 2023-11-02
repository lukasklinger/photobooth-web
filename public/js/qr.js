function createQR() {
    let url = window.location.href
    url += "photos/" + roomID

    new QRCode("qrcode", {
        text: url,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff"
    })
}