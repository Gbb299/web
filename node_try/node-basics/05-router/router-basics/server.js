const fs = require('fs')
const mime = require('mime')
require('http')
    // .createServer((req,res) => {
    //     const urlString = req.url
    //     console.log(urlString)
    //     switch (urlString) {
    //         case '/':
    //             res.end('HELLO')
    //             break
    //         case '/home':
    //             fs.readFile('./home.html', (err, content) => {
    //                 res.end(content)
    //             })
    //             break
    //         case '/app.js':
    //             fs.readFile('./app.js', (err, content) => {
    //                 res.end(content)
    //             })
    //             break
    //         case '/one.png':
    //             fs.readFile('./one.png', (err, content) => {
    //                 res.end(content)
    //             })
    //             break
    //         default:
    //             res.end('page 404')
    //     }
    // })
    .createServer((req, res) => {
        const urlString = req.url
        const type = mime.getType(urlString.split('.')[1])
        res.writeHead(200, {
            'content-type': type
        })
        const file = fs.readFileSync(`.${urlString}`)
        res.end(file)
    })
    .listen(8080, () => {
        console.log('localhost:8080')
    })