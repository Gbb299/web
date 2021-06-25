// 转移到 remove.js 2021-5-28 傍晚
import http from '../utils/http'

export const usersRemove = async(id) => {
    // 2021-5-19 晚上
    // 2021-5-20 晚上
    try {
        let { result } = await http({
            url: '/api/users',
            type: 'delete',
            data: {
                id
            },
        })
        return result
    } catch (err) {
        console.log(err)
    }
}


// export const usersRemove = (id) => {
//     return $.ajax({
//         url: '/api/users',
//         headers: {
//             'X-Access-Token': localStorage.getItem('lg-token') || ''
//         },
//         type: 'delete',
//         data: {
//             id
//         },
//         success(res) {
//             return res
//         }
//     })
// }