import http from '../utils/http'

export const remove = async({ url, id }) => {
    // 2021-5-19 晚上
    // 2021-5-20 晚上
    console.log(url)
    console.log(id)
    try {
        let { result } = await http({
            url,
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