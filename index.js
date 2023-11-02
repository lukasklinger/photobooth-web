const express = require('express')
const app = express()
const multer = require('multer')
const http = require('http')
const server = http.createServer(app)
const fs = require('fs')

const storage = multer.diskStorage(
    {
        destination: './public/photos/',
        filename: function (req, file, cb) { cb(null, file.originalname) }
    }
)

const upload = multer({
    dest: 'public/photos',
    limits: { fileSize: 2000000 },
    storage: storage,
    fileFilter: (req, file, callback) => {
        console.log(file);
        if (!file.originalname.match(/\.png$/)) {
            return callback(new Error('Please upload a PNG'))
        }
        callback(undefined, true);
    }
})

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/photos/:id', (req, res) => {
    // get photos for room
    let files = fs.readdirSync(__dirname + '/public/photos').filter((file) => {
        return file.startsWith(req.params.id);
    })

    files = files.reverse()

    res.render('photos', { photos: files })
})

app.post('/upload', upload.single('photo'), (req, res) => {
    res.redirect('/');
})

server.listen(3000, () => { console.log('listening on *:3000') })