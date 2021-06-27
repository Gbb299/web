//  读取默认文件
const path = require('path')
const mime = require('mime')
const fs = require('fs')

function myReadFile(file, res) {
    return new Promise((resolve, rejects) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                // rejects('你访问的是一个文件夹，且文件夹里没有index.html')
            } else {
                resolve(data)
            }
        })
    })
}

async function readStaticFile(filePathName, res) {
    let ext = path.parse(filePathName).ext || 'text/html'
    // getType 返回的是类型
    let mimeType = mime.getType(ext)
    let data
    // existsSync() 判断文件是否存在
    if (fs.existsSync(filePathName)) {
        if (ext) {
            // myReadFile(filePathName)
            // .then(result => data = result)
            // .catch((err) => data = err)
            data = await myReadFile(filePathName)
        } else {
            // myReadFile(path.join(filePathName, '/index.html'))
            // .then(result => data = result)
            // .catch((err) => data = err)
            data = await myReadFile(path.join(filePathName, '/index.html'))
            // console.log(data);
        }
    } else {
        data = 'file not found' 
    }
    return {
        mimeType,
        data
    }
}

module.exports = readStaticFile