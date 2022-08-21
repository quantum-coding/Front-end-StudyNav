var express = require("express")
const connection = require("./connect")
const getMenuList = require("./route/index")
const login = require("./route/login")
const register = require("./route/register")
const validateName = require("./route/validateName")
const { info, updateInfo } = require("./route/info")
const upload = require("./route/upload")
var app = express()

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例,访问地址为http://%s:%s", host, port)
})

// 链接数据库
connection.connect();
app.use(express.json());
app.use("/user_avatar", express.static("user_avatar"))
// 前端访问数据跨域设置
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Credentials': true, //允许后端发送cookie
        'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
        'Access-Control-Allow-Methods': 'PUT,POST,GET,PATCH,DELETE,OPTIONS',//允许支持的请求方式
        'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
    })

    req.method === 'OPTIONS' ? res.status(204).end() : next()

})



// 获取菜单项
app.get('/menu', getMenuList)

//验证登录信息
app.post('/login', login)

// 提交注册信息
app.post('/register', register)

// 验证用户名是否合法
app.post('/validateName', validateName)

// 获取用户信息
app.post("/info", info)

// 修改用户信息
app.patch("/updateInfo", updateInfo)

//上传用户头像
app.post("/upload/avatar", upload)


