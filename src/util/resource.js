import request from "./requests"

// 添加资源
export const addResource = async (params) => {
    // console.log(params)
    let res = await request.post('/addResource', params)
    return res
}

// 获取资源列表
export const InitResList = async (params) => {
    // console.log("params", params)
    let res = await request.get('/resource/initreslist', {
        params: params
    })
    return res
}

// 上传资源封面图片
export const uploadResCover = async (params) => {
    console.log(params)
    let res = await request.post('/upload/rescover', params, { headers: { "Content-Type": "multipart/form-data" } })
    return res
}

// 获取资源详情
export const getResDetail = async (params) => {
    // console.log("params", params)
    let res = await request.get('/resource/getResDetail', {
        params: { resId: params }
    })
    return res
}

// 更新资源信息
export const updateRes = async (params) => {
    let res = await request.patch('/resource/updateRes', params)
    return res
}

// 删除资源信息
export const deleteRes = async (params) => {
    let res = await request.delete('/resource/deleteRes', {
        params: {
            resId: params
        }
    })
    return res
}