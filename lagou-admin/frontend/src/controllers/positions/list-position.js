import { auth as authModel } from '../../models/auth'
import positionsTpl from '../../views/positions.art'
import positionListTpl from '../../views/positions-list.art'
import page from '../../databus/page'
import pagination from '../../components/pagination'
import { positionList } from '../../models/positions-list'
import { addPosition } from './add-position'
import { updatePosition, fillPositionsUpdateTpl } from './update-position'
import { remove } from '../common/index'


const pageSize = page.pageSize
let state = {
    list: []
}

// 装填list 数据
const _list = (pageNo) => {
    let start = (pageNo - 1) * pageSize
    $('#positions-list').html(positionListTpl({
        data: state.list.slice(start, start + pageSize),
    }));
    // slice 从数组中返回选定的元素
}

// 从后端加载数据集
const _loadData = async() => {
    // 通过 ajax 获取到后端数据 2021-5-23 早
    let list = await positionList();
    state.list = list;

    // 分页
    pagination(list)

    // 数据渲染 将当前页传进去？
    _list(page.curPage)
}

// 实现点击翻页的效果
const _subscribe = () => [
    $('body').off('changeCurPage').on('changeCurPage', (e, index) => {
        // console.log(index);
        _list(index)
    }),
    $('body').off('addPosition').on('addPosition', (e) => {
        _loadData()
    })
]

const listPositions = (router) => {
    return async(req, res, next) => {
        let result = await authModel()
        if (result.ret) {
            next();
            // 渲染首页
            res.render(positionsTpl());

            // 初次渲染list
            _loadData()

            // 订阅事件
            _subscribe()

            // 添加职位 
            addPosition()

            // 编辑职位
            updatePosition()

            // 删除
            remove({
                $box: $('#positions-list'),
                state, // 传递一个引用类型的值state，在删除组件里可以实时获取数据条数
                url: ' /api/positions/remove',
                loadData: _loadData
            })

            $('#positions-list')
                .off('click', '.positions-update')
                .on('click', '.positions-update', function() {
                    // 编辑职位
                    fillPositionsUpdateTpl($(this).data('id'))
                })
                // 2021-5-22 中午 职位管理页面
                // 渲染list
                // $('#positions-list').html(positionListTpl({
                //     data: list
                // }))

            // // 分页效果
            // pagination(list);
            // 2021-5-26 晚 分离 职位添加 
            // 职位管理
            // $('#positions-list-box').after(positionsAddTpl())
            // $('#positions-save').off('click').on('click', async() => {
            //     const formbody = $('#position-form').serialize()
            //     let result = await positionsAdd(formbody)

            //     // 单击关闭模态框
            //     $('#positions-close').click()
            // })
        } else {
            router.go('/signin')
        }
    }
}

export default listPositions