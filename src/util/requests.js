import axios from 'axios'

const service = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 10000,
})

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err)
})

export default service