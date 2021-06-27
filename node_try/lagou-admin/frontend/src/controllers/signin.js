import signintpl from '../views/signin.art'
import { signin as signinModel } from '../models/signin'
const htmlSignin = signintpl({})

const _handleSubmit = (router) => {
    return async(e) => {
        e.preventDefault()
        const data = $('#signin').serialize()
        let { res, jqXHR } = await signinModel(data)

        // 拿到后端传过来的 token
        const token = jqXHR.getResponseHeader('X-Access-Token')
            // 存储起来
        localStorage.setItem('lg-token', token)
        if (res.ret) {
            router.go('/index')
        }

    }
}


// 登录模块
const signin = (router) => {
    return (req, res, next) => {
        res.render(htmlSignin)
        $('#signin').on('submit', _handleSubmit(router))
    }
}

export default signin