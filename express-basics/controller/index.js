var template = require('art-template');
const path = require('path')
const fs = require('fs')
var jwt = require('jsonwebtoken');

const listModule = require('../model/list')
    // 应用中间件
const list = (req, res, next) => {
    // 后端渲染
    // let data = '<ul>'
    // for (let i = 1; i < 100; i++) {
    //     data += `<li>Line ${i}</li>`
    // }
    // data += '</ul>'

    //     let dataObj = {
    //         ret: true,
    //         data: []
    //     }
    // for (let i = 1; i < 100; i++) { 
    //     dataObj.data.push('line'+ i)
    // }

    // res.set('content-type', 'application/json; charset=utf-8')

    // res.render('list', {
    //     data: JSON.stringify(dataArray)
    // })

    // res.render('list-html', {
    //     // 将 数组 传给 list-html 
    //     data: dataArray
    // })

    // html 渲染好了
    var html = template(path.join(__dirname, '../view/list-html.art'), {
        data: listModule.dataArray
    });

    fs.writeFileSync(path.join(__dirname, '../public/list.html'), html)

    res.send('pages has been complied')
}

const token = (req, res, next) => {
    // 对称加密
    // const tk = jwt.sign({ username: 'admin' }, 'hahah')

    // const decoded = jwt.verify(tk, 'hahah')
    // res.send(decoded)

    // 非对称加密
    const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    const tk = jwt.sign({ username: 'admin' }, privateKey, { algorithm: 'RS256' })

    const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'))
    const result = jwt.verify(tk, publicKey)
    res.send(result)
}

exports.list = list
exports.token = token