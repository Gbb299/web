const { Positions } = require('../utils/db')


exports.positions = (start, pageSize) => {
    // 将数据倒序，添加数据后显示到第一条
    return Positions.find({}).skip(start).limit(pageSize).sort({ _id: -1 })
}