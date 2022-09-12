import request from './requests'

export const InitResList = (params) => {
    console.log("params", params)
    let res = request.get('/resource/initreslist', {
        params: params
    })
    return res
}