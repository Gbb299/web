import http from '../utils/http'

export const usersList = async() => {
    // 2021-5-19 晚上
    // 2021-5-20 晚上
    try {
        let { result } = await http({
            url: '/api/users'
        })
        return result
    } catch (err) {
        console.log(err)
    }
}


// export const usersList = () => {
//     return $.ajax({
//         url: '/api/users',
//         headers: {
//             'X-Access-Token': localStorage.getItem('lg-token') || ''
//         },
//         // Jquery的异步操作
//         // async: false,
//         success(result) {
//             return result
//         }
//     })
// }