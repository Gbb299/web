const usersModel = require('../models/users')
const { hash, compare, sign, verify } = require('../utils/tools')
    // const randomstring = require('randomstring')

// 注册用户
const signup = async(req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')

    const { username, password } = req.body

    const bcryptPassword = await hash(password)

    // 密码加密
    // const bcryptPassword = await hash(password)

    // 判断用户是否存在
    let findResult = await usersModel.findUser(username)

    if (findResult) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户已存在'
            })
        })
    } else {
        // 如果用户不存在，则添加用户
        let result = await usersModel.signup({
                username,
                password: bcryptPassword
            })
            // console.log(result);

        res.render('succ', {
            data: JSON.stringify({
                message: '注册成功'
            })
        })
    }

}

// 用户登录
const signin = async(req, res, next) => {
    const { username, password } = req.body
    let result = await usersModel.findUser(username)
        // 验证用户是否合法
    if (result) {
        let { password: hash } = result
        let compareResult = await compare(password, hash)
        if (compareResult) {

            // req.session.username = username
            // 2021-5-16 用户登录 token方案-1 晚上
            // 生成token
            const token = sign(username)
            res.set('X-Access-Token', token)


            res.render('succ', {
                data: JSON.stringify({
                    username
                })
            })

            // const sessionId = randomstring.generate()
            // 可以实现后端向前端传cookie
            // res.set('Set-Cookie', 'foo=bar; Paht=/; HttpOnly')
            // console.log(sessionId)

        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名或密码错误'
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名或密码错误'
            })
        })
    }
}

// 用户登出
const signout = async(req, res, next) => {
    // Destorying a session
    req.session = null
    res.render('succ', {
        data: JSON.stringify({
            message: '退出登录'
        })
    })
}

// 用户列表
const list = async(req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')

    const listResult = await usersModel.findList()
    res.render('succ', {
        data: JSON.stringify(listResult)
    })
}


// 删除用户
const remove = async(req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')

    const { id } = req.body
    let result = await usersModel.remove(id)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '用户删除成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户删除失败'
            })
        })
    }

}

const isAuth = async(req, res, next) => {
    let token = req.get('X-Access-Token')
    try {
        let result = verify(token)
        res.render('succ', {
            data: JSON.stringify({
                username: result.username
            })
        })
    } catch (e) {
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录。'
            })
        })
    }

    // if (req.session.username) {
    //     res.render('succ', {
    //         data: JSON.stringify({
    //             username: req.session.username
    //         })
    //     })
    // } else {
    //     res.render('fail', {
    //         data: JSON.stringify({
    //             message: '请登录。'
    //         })
    //     })
    // }
}


exports.signup = signup
exports.list = list
exports.remove = remove
exports.signin = signin
exports.signout = signout
exports.isAuth = isAuth