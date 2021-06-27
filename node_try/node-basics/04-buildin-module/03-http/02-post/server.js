const http = require('http');
const queryString = require('querystring');

const postData = queryString.stringify({
    provinve : '上海',
    city : '上海',
    district : '宝山区',
    adress : '同济支路199号智慧7立方3号楼2-4栋',
    latitude : 43.0,
    longtitude : 160.0,
    message : '一条小鱼干',
    contact : '199001',
    type: 'sell',
    time : 19001,
})

const options = {
    protocal: 'http:',
    hostname: 'localhost',
    method: 'post',
    port: 3000,
    path: '/data',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-Length': Buffer.byteLength(postData)
    }
}
const server = http.createServer((req, res) => {
    const request = http.request(options,(result) => {

    })
    request.write(postData);
    request.end();

    res.end();
})

server.listen(8080, () => {
    console.log('localhost:8080' );
})