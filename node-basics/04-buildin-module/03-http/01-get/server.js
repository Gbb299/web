const http = require('http');
const https = require('https');
const queryString = require('querystring')
// 传一个回调函数，接收参数为函数的函数（高阶函数）
const server = http.createServer((request, response) => {

    // const url = request.url;
    // let data = '';
    // request.on('data', (chunk) => {
    //     data += chunk;
    // })
    // request.on('end', () =>{

    // })
    https.get('https://trade.m.xiaomiyoupin.com/mtop/arch/metis/cart', (result) => {
        let data = '';
        result.on('data', (chunk) => {
            data += chunk;
        }) 
        result.on('data', () => {
            response.writeHead(200, {
                'content-type': 'application/json;charset=utf-8'
            })
            // 第一个参数 状态吗 ， 第二个参数  content-type 对象
            // response.write(JSON.stringify(queryString.parse(data)));
            response.write(data)
            response.end();
        })
    })

})

server.listen(8080, () => {
    console.log('localhost:8080')
})