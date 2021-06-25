import http from '../utils/http'

export const positionList = async() => {
    try {
        let { result } = await http({
            url: '/api/positions/list'
        })
        return result
    } catch (err) {
        console.log(err)
    }
}