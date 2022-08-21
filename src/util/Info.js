import request from "./requests"

export const getInfo = async (params) => {
    // console.log(params)
    let res = await request.post('/info', { userId: params })
    return res
}

export const updateInfo = async (params) => {
    let res = await request.patch('/updateInfo', params)
    return res
}