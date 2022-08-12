import request from "./requests"

export const register = async (params) => {
    // let params = new URLSearchParams()
    // params.append("username", p.username)
    // params.append("password", p.password)
    let res = await request.post('/register', params)
    return res
}