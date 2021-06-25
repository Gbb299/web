const express = require('express')
const { list, token } = require('../controller')

// 路由中间件
const router = express.Router()

router.get('/api/list', list)
router.get('/api/token', token)


// // get 请求获取数据
// router.get('/index', (req, res, next) => {
//     // 收取 get 请求的数据
//     const query = req.query
//     console.log(query);
//     res.send('index page')
// })

// // post 添加数据
// router.post('/index', (req, res, next) => {
//     const data = req.body
//     console.log(data)
//     res.send(data)
// })

// // put 修改数据-覆盖式修改
// router.put('/index', (req, res, next) => {
//     const data = req.body
//     console.log(data)
//     res.send('put response')
// })

// // patch 修改数据 - 增量修改（选择性修改） 
// router.patch('/index', (req, res, next) => {

//     res.send('patch response')
// })

// // delete 删除数据
// router.delete('/index', (req, res, next) => {

//     res.send('delete response')
// })

// // 往后端送方法 ？
// xhr.open()
// // 往后端送数据
// xhr.send()
// 还有 ajax 请求


// router.all('/index', (req, res, next) => {
//     res.send('hello')
// })



module.exports = router