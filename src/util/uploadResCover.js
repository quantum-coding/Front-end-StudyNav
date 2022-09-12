import request from "./requests"

export const uploadResCover = async (params) => {
    console.log(params)
    let res = await request.post('/upload/rescover', params, { headers: { "Content-Type": "multipart/form-data" } })
    return res
}