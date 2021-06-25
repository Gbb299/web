// 2020/4/17 中午  （四）常用的内置模块 --> 5. File System

// 文件夹的操作

// （一）创建文件 参数1：文件名， 参数2:回调函数 （错误优先：参数1 是 错误）

const fs = require('fs');
const fsPromises = require('fs').promises;

// fs.mkdir('logs', (err) => {
//     if (err) throw err;
//     console.log("文件夹创建成功！")
// })

// （二）修改文件夹名字 参数1：路径，参数2：修改目标的名字，回调

// fs.rename('./logs', './log', () => {
//     console.log('文件夹名修改成功！')
// })

// （三）删除文件夹 参数1:删除对象，回调

// fs.rmdir('./log', () => {
//     console.log('done.')
// })

// （四）查询 

// fs.readdir('./logs', (err, result) => {
//     console.log(result);
// })

// 文件的操作

// （五）创建文件 参数1:路径+文件名，参数2:写入内容， 参数3: 回调

// fs.writeFile('./logs/log1.log', "HELLO \nWORLD!", (err) => {
//     console.log('done.')
// })

// 

// (六) 修改文件 （向创建好的文件追加内容）

// fs.appendFile('./logs/log1.log', '!!!', (err) => {
//     console.log('done.')
// })


// (七) 删除文件 参数1：路径，参数2；回调

// fs.unlink('./logs/log1.log', (err) => {
//     console.log('done.')
// })

// (八) 读取操作 参数1: 路径，参数2: 类型 参数3: 回调

// 方法一：

// fs.readFile('./logs/log1.log', 'utf-8',(err, content) => {
//     console.log(content);
// })

// 方法二：

// fs.readFile('./logs/log1.log', (err, content) => {
//     console.log(content.toString());
// })

// 同步  异步

// fs.readFile('./logs/log1.log', (err, content) => {
//     console.log(content.toString());
// })

// const content = fs.readFileSync('./logs/log1.log');
// console.log(content.toString());

// console.log('continue ...')

// ;(async () => {
//     let result = await fsPromises.readFile('./logs/log1.log')
//     console.log(result.toString())
// })()


// (九)批量写文件 

// for (let i = 0; i < 10; i++) {
//     fs.writeFile(`./logs/log-${i}.log`, `log-${i}`, (err) => {
//         console.log('done.')
//     })
// }

// （十） 遍历文件 读取文件/目录信息

// function readDir(dir) {
//     fs.readdir(dir, (err, content) => {
//         content.forEach((value, index) => {
//             let joinDir = `${dir}/${value}`
//             fs.stat(joinDir, (err, stats) => {
//                 if (stats.isDirectory()) {
//                     readDir(joinDir)
//                 } else {
//                     fs.readFile(joinDir, 'utf-8', (err, content) => {
//                         console.log(content)
//                     })
//                 }
//             })
//         })
//     })
// }

// readDir('./')


// watch 监测文件变化

// fs.watch('./logs/log-0.log', (err) => {
//     console.log('Successful!!')
// })
