const connection = require("../connect")

let sql = "SELECT * FROM userinfo WHERE user_name = ?"

const validateName = (req, res) => {
    connection.query(sql, req.body.name, function (err, result) {
        if (err) {
            console.log('[query ERROR] - ', err.message);
            return;
        } else {
            if (result.length === 0) {
                res.json({
                    isExist: false,
                    msg: "用户名正确！"
                });
                return;
            }
            res.json({
                isExist: true,
                msg: "用户名已存在！"
            });
        }
    })
}

module.exports = validateName