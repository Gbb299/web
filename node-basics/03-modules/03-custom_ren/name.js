// 第一步 定义模块
const name = {
    shortName : 'zhang',
    sayName() {
        console.log(this.shortName)
    }
}

const age = {
    age: 100,
}
// 第二步 暴露模块
// 暴露接口只有一个
module.exports = {
    name,
    age
}
