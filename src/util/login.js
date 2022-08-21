import request from "./requests"

export const login = async (params) => {
    console.log(params)
    let res = await request.post('/login', params)
    return res
}