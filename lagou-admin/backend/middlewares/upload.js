const path = require('path')
const mime = require('mime')
const multer = require('multer')
const fs = require('fs')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function(req, file, cb) {
        let ext = mime.getExtension(file.mimetype)
        let filename = file.fieldname + '-' + Date.now() + '.' + ext
        cb(null, filename)
    }
})

const limits = {
    fileSize: 200000,
    files: 1
}

function fileFilter(req, file, cb) {
    // 这个函数应该调用 `cb` 用boolean值来
    // 指示是否应接受该文件

    const acceptType = [
        'image/png',
        'image/jpg',
        'image/jpeg'
    ]

    if (!acceptType.includes(file.mimetype)) {
        // 如果有问题，你可以总是这样发送一个错误:
        cb(new Error('文件必须是jpg, jpeg, png'))
    } else {

        // 接受这个文件，使用`true`，像这样:
        cb(null, true)
    }
}

var upload = multer({
    storage,
    limits,
    fileFilter
}).single('companyLogo')

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            res.render('fail', {
                data: JSON.stringify({
                    message: '文件超过200K'
                })
            })
        } else if (err) {
            res.render('fail', {
                data: JSON.stringify({
                    message: err.message
                })
            })
        } else {
            const { companyLogo_old } = req.body
            if (req.file && companyLogo_old) {
                try {
                    fs.unlinkSync(path.join(__dirname, `../public/uploads/${companyLogo_old}`));
                    req.companyLogo = req.file.filename;
                } catch (err) {
                    console.log(err)
                }
            } else if (!req.file && companyLogo_old) {
                req.companyLogo = companyLogo_old
            } else {
                req.companyLogo = req.file.filename
            }
            next()
        }
    })
}

module.exports = uploadMiddleware