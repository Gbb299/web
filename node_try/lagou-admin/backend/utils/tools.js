const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
            // Store hash in your password DB.
            // 如何将值返回去 --- 用promise封装
            // console.log(hash)
            if (err) {
                reject(err)
            }
            resolve(hash)
        });
    })
}

exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
            resolve(result)
        })
    })
}

// 2021-5-16 用户登录 token方案-1
exports.sign = (username) => {
    const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
    const token = jwt.sign({ username }, privateKey, { algorithm: 'RS256' })
    return token
}
exports.verify = (token) => {
    const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'))
    const result = jwt.verify(token, publicKey)
    return result
}