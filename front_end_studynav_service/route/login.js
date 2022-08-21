const connection = require("../connect")

let sql = "SELECT * FROM userinfo WHERE user_name = ?"

const login = (req, res) => {
    let sqlParams = req.body.username
    connection.query(sql, sqlParams, function (err, result) {
        if (err) {
            console.log('[query ERROR] - ', err.message);
            return;
        } else {
            if (result.length === 0) {
                res.json({
                    success: false,
                    msg: "用户名账号或密码不正确！"
                });
                return;
            }

            res.json({
                success: true,
                msg: "登录成功！",
                userId: JSON.parse(JSON.stringify(...result)).user_id
            });
        }
    })
}

module.exports = login