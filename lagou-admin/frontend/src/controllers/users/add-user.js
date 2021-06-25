import page from '../../databus/page'
import usersAddTpl from '../../views/users-add.art'
import { usersAdd as usersAddModel } from '../../models/users-add'

// 添加用户
export const addUser = () => {
    const html = usersAddTpl()
    $('#user-list-box').after(html)
    
    const _save = async() => {
            // 提交表单
            // 少了 # 会报错
            const data = $('#users-form').serialize()
            let result = await usersAddModel(data)
            if (result.ret) {
                // 回到第一页
                page.setCurPage(1)

                // 告知list页面要重新渲染
                $('body').trigger('addUser')
            }

            // 单击关闭模态框
            const $btnClose = $('#users-close')
            $btnClose.click()
        }
        // 点击保存，提交表单
    $('#users-save').on('click', _save)
}