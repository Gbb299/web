import http from '../utils/http'

export const usersAdd = async(data) => {
    // 2021-5-19 晚上
    // 2021-5-20 晚上
    try {
        let { result } = await http({
            url: '/api/users',
            type: 'post',
            data
        })
        return result
    } catch (err) {
        console.log(err)
    }
}

// export const usersAdd = (data) => {
//     return $.ajax({
//         url: '/api/users',
//         type: 'post',
//         headers: {
//             'X-Access-Token': localStorage.getItem('lg-token') || ''
//         },
//         data,
//         success: function(res) {
//             return res
//         }
//     })
// }