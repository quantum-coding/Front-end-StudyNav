var express = require("express")
var app = express()

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为http://%s:%s", host, port)
})

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlhwc2097',
    database: 'studynav'
})
connection.connect();



app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Credentials': true, //允许后端发送cookie
        'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
        'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
    })

    req.method === 'OPTIONS' ? res.status(204).end() : next()

})

app.get('/', async function (req, res) {

    let getMenulist = new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM menu", function (err, result) {
            if (err) {
                // console.log("查询的数据不存在");
                reject("查询的数据不存在");
            }
            var res_menu = [];
            console.log("---------------SELECT----------------");
            result = JSON.parse(JSON.stringify(result));

            for (x in result) {
                if (result[x].pid == 0) {
                    res_menu.push(result[x]);
                }
            }

            for (x in res_menu) {
                res_menu[x].children = new Array();
                for (var i = 0; i < result.length; i++) {
                    if (res_menu[x].menu_id == result[i].pid) {
                        const item = JSON.parse(JSON.stringify(result[i]));
                        res_menu[x].children.push(item);
                        // return;
                    }
                }
            }

            console.log("-------------------------------------\n\n");
            resolve(res_menu);
        });

    })

    let menu_Tree = await getMenulist;

    res.send(menu_Tree);



})




