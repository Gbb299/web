const express = require('express')

const app = express()

const middleWares = [(req, res, next) => {
    console.log(0)
    // 执行了next后才会继续执行下一个
    next()
    // 响应请求
    // res.send('hello')
}, (res, req, next) => {
    console.log(1)
    next()
}, (res, req) => {
    console.log(2)
}]
// 请求路由
// 回调函数又被称为 中间件
// 中间件栈： 两个中间件之间形成一个栈 ？？？
app.use('/', middleWares)

// app.use('/api', (req, res) => {
//     console.log('world')
// })

app.listen(8080, () => {
    console.log('localhost:8080')
})