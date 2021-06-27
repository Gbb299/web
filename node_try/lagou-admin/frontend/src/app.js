// 载入css
import './assets/common.css'
// 载入路由
import router from './routers'
const hash = location.hash.slice(1)
router.go(hash)