import request from "./requests"

export const login = async (params) => {
    let res = await request.post('/login', params)
    return res
}