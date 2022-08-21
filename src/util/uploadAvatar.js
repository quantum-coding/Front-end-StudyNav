import request from "./requests"

export const uploadAvatar = async (params) => {
    console.log(params)
    let res = await request.post('/upload/avatar', params, { headers: { "Content-Type": "multipart/form-data" } })
    return res
}