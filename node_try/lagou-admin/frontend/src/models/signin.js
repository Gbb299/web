import http from '../utils/http'

export const signin = async(data) => {
    // 2021-5-19 晚上
    // 2021-5-20 晚上
    try {
        let { result: res, jqXHR } = await http({
            url: '/api/users/signin',
            data,
            type: 'post'
        })
        return {
            res,
            jqXHR
        }
    } catch (err) {
        console.log(err)
    }
}

// export const signin = (data) => {
//     return new Promise((resolve) => {
//         $.ajax({
//             url: '/api/users/signin',
//             type: 'post',
//             dataType: 'json',
//             data,
//             success: function(res, textStatus, jqXHR) {
//                 resolve({
//                     res,
//                     jqXHR
//                 })
//             }
//         })
//     })
// }