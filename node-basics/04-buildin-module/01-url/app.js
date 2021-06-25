var log4js = require("log4js");

log4js.configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});

var logger = log4js.getLogger('cheese');
logger.level = "debug";

const url =require('url');
const urlObj = {
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'www.baidu.com:443',
    port: '443',
    hostname: 'www.baidu.com',
    hash: null,
    search: '?id=2&tag=3',
    query: 'id=2&tag=3',
    pathname: '/path/index.html',
    path: '/path/index.html?id=2&tag=3',
    href: 'https://www.baidu.com:443/path/index.html?id=2&tag=3'
}
const urlString = 'https://www.baidu.com:443/path/index.html?id=2&tag=3';



// logger.debug(url.parse(urlString));
// logger.debug(url.format(urlObj));
// logger.debug(url.resolve('http://abc.com/a', '../'));
// logger.debug(url.resolve('http://abc.com/a', '/b'));

const  urlParams = new URLSearchParams(url.parse(urlString).search);
logger.debug(urlParams.get('id'));