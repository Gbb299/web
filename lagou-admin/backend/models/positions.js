const { Positions } = require('../utils/db')

exports.add = (data) => {
    const position = new Positions(data)
    return position.save()
}

exports.list = () => {
    // 将数据倒序，添加数据后显示到第一条
    return Positions.find({}).sort({ _id: -1 })
}

exports.listone = (id) => {
    console.log(id)
    return Positions.findOne({ _id: id })
}

exports.remove = (id) => {
    return Positions.deleteOne({ _id: id })
}

exports.update = (data) => {
    return Positions.findByIdAndUpdate(data.id, data)
}