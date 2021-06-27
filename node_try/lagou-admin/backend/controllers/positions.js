const positionModal = require('../models/positions')
    // 时间格式
const moment = require('moment')

// 向数据库添加职位信息
exports.add = async(req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')
    let result = await positionModal.add({
        ...req.body,
        companyLogo: req.companyLogo,
        createTime: moment().format('YYYY年MM月DD日 HH:mm')
    })
    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '职位添加成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '职位添加失败'
            })
        })
    }
}

// 获取数据库中的职位信息
exports.list = async(req, res, next) => {
    let result = await positionModal.list()
    if (result) {
        res.json(result)
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '获取数据失败'
            })
        })
    }
}

exports.listone = async(req, res, next) => {
    let result = await positionModal.listone(req.body.id)
    if (result) {
        res.json(result)
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '获取数据失败'
            })
        })
    }
}

// 删除数据库中对应的信息

exports.remove = async(req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')
    let result = await positionModal.remove(req.body.id)
    try {
        if (result.deletedCount > 0) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '删除职位成功'
                })
            })
            console.log(1)
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '删除职位失败，ID错误'
                })
            })
            console.log(0)
        }
    } catch {
        res.render('fail', {
            data: JSON.stringify({
                message: '删除数据失败'
            })
        })
    }

}

//  职位修改和编辑
exports.update = async(req, res, next) => {
    res.set('content-type', 'application/json; charset=utf-8')
    const data = {
        ...req.body
    }
    if (req.companyLogo) {
        data['companyLogo'] = req.companyLogo
    }
    let result = await positionModal.update(data)

    if (result) {
        res.render('succ', {
            data: JSON.stringify({
                message: '职位编辑成功'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '职位编辑失败'
            })
        })
    }
}