import request from "./requests"

export const register = async (params) => {
    let res = await request.post('/register', params)
    return res
}