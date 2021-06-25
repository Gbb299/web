const path = require('path')
/*
* __dirname : 输出当前代码的物理路径

*    console.log(__dirname)

*   ../ : 获取当前文件夹的上以级目录

*   resolve : 解析路径
*/


console.log(path.resolve(__dirname, '../'))