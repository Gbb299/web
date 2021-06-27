// 2021/4/17 中午 (四) 常用的内置模块 --> 4.event

const EventEmitter = require('events');
class MyEventEmitter extends EventEmitter{}
const event = new MyEventEmitter()

event.on('play', (value) => {
    console.log(value);
})

event.emit('play', 'movie')