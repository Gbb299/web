const express = require('express')
const app = express()
const fs = require('fs')

const { getDb } = require('./db')

app.get('/todos', async(req, res) => {
    // fs.readFile('./db.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         return res.status(500).json({
    //             error: err.message
    //         })
    //     }
    //     //      data 拿 到整个json数据
    //     // JSON.paese() 将从服务端获取的json字符串转换为对象
    //     const db = JSON.parse(data)
    //     res.status(200).json(db.todos)
    // })
    // # 封装后的代码
    try {
        const db = await getDb()
        res.status(200).json(db.todos)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

})

app.get('/todos/:id', async(req, res) => {
    // fs.readFile('./db.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         return res.status(500).json({
    //             error: err.message
    //         })
    //     }

    //     const db = JSON.parse(data)
    // })
    try {
        const db = await getDb()
        const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
        if (!todo) {
            return res.status(404).end()
        }

        res.status(200).json(todo)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

app.listen(3000, () => {
    console.log("Server running at 3000")
})