const Koa = require('koa')

const koa = new Koa()

koa.use = (({ body }, next) => {
    body = 'Hello Koa '
})

koa.listen(3333, 'localhost')