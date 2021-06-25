import ListPageTpl from '../views/pageTuring.art'
import page from '../databus/page'



// 分页
const pagination = (data) => {
    // 数据的总长度 totall
    const totall = data.length;
    // 向上取整，拿到页数
    const pageCount = Math.ceil(totall / page.pageSize)
    const pageArray = new Array(pageCount)
    const htmlPage = ListPageTpl({
        pageArray
    })

    $('#users-page').html(htmlPage)
    _setPageActive(page.curPage)

    _bindEven(data)
        // 页面加载后页码1第一个高亮
        // $('#users-page-list li:nth-child(2)').addClass('active')
}


const _setPageActive = (index) => {
    $('#users-page #users-page-list li:not(:first-child, :last-child')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
}


const _bindEven = (data) => {
    // 页码
    $('#users-page').off('click').on('click', '#users-page-list li:not(:first-child, :last-child)', function() {
            const index = $(this).index()
            page.setCurPage(index)
            $('body').trigger('changeCurPage', index)
            _setPageActive(index)
        })
        // 左翻页
    $('#users-page').on('click', '#users-page-list li:first-child', function() {
            if (page.curPage > 1) {
                page.setCurPage(page.curPage - 1)
                $('body').trigger('changeCurPage', page.curPage)
                _setPageActive(page.curPage)
            }
        })
        // 右翻页
    $('#users-page').on('click', '#users-page-list li:last-child', function() {
        if (page.curPage < Math.ceil(data.length / page.pageSize)) {
            page.setCurPage(page.curPage + 1)
            $('body').trigger('changeCurPage', page.curPage)
            _setPageActive(page.curPage)
        }
    })
}

export default pagination