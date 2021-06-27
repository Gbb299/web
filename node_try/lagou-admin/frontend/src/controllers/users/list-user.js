import usersTpl from '../../views/users.art'
import usersListTpl from '../../views/users-list.art'
import pagination from '../../components/pagination'
import { usersList as usersListModel } from '../../models/users-list'
import { auth as authModel } from '../../models/auth'
import page from '../../databus/page'
import { addUser } from './add-user'
import { remove } from '../common/index'


let state = {
    list: []
}
const pageSize = page.pageSize
const curPage = page.curPage




const _subscribe = () => [
    $('body').on('changeCurPage', (e, index) => {
        // console.log(index);
        _list(index)
    }),
    $('body').on('addUser', (e) => {
        _loadData()
    })
]


// 从后端加载数据
const _loadData = async() => {
    let result = await usersListModel()
    state.list = result.data
        // 分页
    pagination(result.data)

    // 数据渲染, 传入page.curPage的初始值
    _list(curPage)
}

// 渲染list
const _list = (pageNo) => {
    // console.log(pageNo)
    let start = (pageNo - 1) * pageSize
        // console.log(dataList)
    $('#users-list').html(usersListTpl({
        // 从传入位置，取数组
        data: state.list.slice(start, start + pageSize),
    }))


}




const index = (router) => {

    const loadIndex = async(res, next) => {
        // 2021-5-20 晚上 路由改造-3 【5:19】
        // // 渲染首页
        // res.render(htmlIndex)

        // // window resize,让页面充满整个屏幕
        // $(window, '.wrapper').resize()

        // 填充用户列表
        // $('#content').html(usersTpl())

        next()
        res.render(usersTpl())


        $('#add-user-btn').on('click', addUser)

        // 初次渲染list
        await _loadData()

        // 页面事件绑定
        remove({
            $box: $('#users-list'),
            state, // 传递一个引用类型的值state，在删除组件里可以实时获取数据条数
            url: ' /api/users ',
            loadData: _loadData
        })

        // 订阅事件
        _subscribe()

    }
    return async(req, res, next) => {
        let result = await authModel()
        if (result.ret) {
            loadIndex(res, next)
        } else {
            router.go('/signin')
        }
    }
}



export default index