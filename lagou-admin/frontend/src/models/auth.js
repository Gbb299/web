import http from '../utils/http'

export const auth = async() => {
    // 2021-5-19 晚上
    try {
        let { result } = await http({
            url: '/api/users/isAuth'
        })
        return result
    } catch (err) {
        console.log(err)
    }

    // return $.ajax({
    //     url: '/api/users/isAuth',
    //     dataType: 'json',
    //     headers: {
    //         'X-Access-Token': localStorage.getItem('lg-token') || ''
    //     },
    //     success(result) {
    //         return result
    //     }
    // })
}