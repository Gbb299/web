import indexTpl from '../views/index.art'
import { auth as authModel } from '../models/auth'
import pageHeader from '../components/pageheader'

import page from '../databus/page'

const index = (router) => {

    return async(req, res, next) => {
        let result = await authModel()
        if (result.ret) {
            const html = indexTpl({
                subRouter: res.subRoute()
            });
            // 渲染首页

            next(html);
            // window resize,让页面充满整个屏幕
            $(window, '.wrapper').resize();

            // 加载导航栏
            pageHeader()

            // 2021-5-21 早上 【49】 修整bug 
            const $as = $('#sidebar-menu li:not(:first-child) a')
            let hash = location.hash
            $as
                .filter(`[href="${hash}"]`)
                .parent()
                .addClass('active')
                .siblings()
                .removeClass('active')

            // 是否重置page
            // console.log(hash)
            // console.log('-->' + page.curRoute)
            if (hash != page.curRoute) {
                // console.log(1)
                page.reset
            }

            // 保存当前url
            page.setCurRouter(hash)

            // 登出事件绑定
            $('#users-signout').on('click', (e) => {
                e.preventDefault()
                localStorage.setItem('lg-token', '')
                location.reload()
                    // $.ajax({
                    //     url: '/api/users/signout',
                    //     headers: {
                    //         'X-Access-Token': localStorage.getItem('lg-token') || ''
                    //     },
                    //     dataType: 'json',
                    //     success(result) {
                    //         if (result.ret) {
                    //             location.reload()
                    //         }
                    //     }
                    // })

            })

        } else {
            router.go('/signin')
        }
    }


    // 2021-5-20 晚上
    // const loadIndex = (res) => {
    //     // 渲染首页
    //     res.render(htmlIndex)

    //     // window resize,让页面充满整个屏幕
    //     $(window, '.wrapper').resize()

    //     // 填充用户列表
    //     $('#content').html(usersTpl())
    //     $('#add-user-btn').on('click', addUser)

    //     // 初次渲染list
    //     _loadData()

    //     // 页面事件绑定
    //     _metheds()

    //     // 订阅事件
    //     _subscribe()

    // }
}



export default index