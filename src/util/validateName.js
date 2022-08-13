import request from "./requests"

export const validateName = async (params) => {
    let res = await request.post('/validateName', params)
    return res
}