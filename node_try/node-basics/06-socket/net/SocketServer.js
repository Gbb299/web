// const net = require('net')

// const server = net.createServer((socket) => {
//     socket.write('hello')
//     socket.on('data', (chunk) => {
//         console.log(chunk.toString())
//     })
// })

// server.on('error', (err) => {
//     // Handle err heres
//     throw err
// })

// // grab an arbitrary unused port
// server.listen('9527', () => {
//     console.log('open server on ', server.address())
// })


const net = require('net')

const server = new net.createServer()

let clients = {}
let clientName = 0

server.on('connection', (client) => {
    client.name = ++clientName
    clients[client.name] = client

    client.on('data', (msg) => {
        // console.log('客户端传来：' + msg);
        broadcast(client, msg.toString())
    })

    client.on('error', (e) => {
        console.log('client error' + e);
        client.end()
    })

    client.on('close', (data) => {
        delete clients[client.name]
        console.log(client.name + ' 下线了');
    })
})

function broadcast(client, msg) {
    for (var key in clients) {
        clients[key].write(client.name + ' 说：' + msg)
    }
}

server.listen(9000, 'localhost')