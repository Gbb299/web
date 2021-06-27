const http = require('http');
const url = require('url');
const {createProxyMiddleware} = require('http-proxy-middleware')

const server = http.createServer((req, res) => {
    const urlStr = req.url;
    if (/\/ajax/.test(urlStr)) {
        // 验证 传入的 url 是否有api
        const proxy = createProxyMiddleware('/ajax', {
            target: 'http://category.vip.com/',
            changeOrigin: true
        })

        proxy(req, res)
    }else if (/\/api/.test(urlStr)) {
        const proxy2 = createProxyMiddleware('/api', {
            target: 'http://m.lagou.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
        proxy2(req, res)
    }
     else {
        console.log("ERRO")
    }
})

server.listen(8080, () => {
    console.log('localhost:8080');
})