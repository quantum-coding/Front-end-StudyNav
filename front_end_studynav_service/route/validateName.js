const connection = require("../connect")

let sql = "SELECT * FROM userinfo WHERE user_name = ?"

const validateName = (req, res) => {
    connection.query(sql, req.body.name, function (err, result) {
        if (err) {
            console.log('[query ERROR] - ', err.message);
            return;
        } else {
            // 如果用户id不存在,且名字不重复则用户名正确
            if (result.length === 0 && !req.body.id) {
                res.json({
                    isExist: false,
                    msg: "用户名正确！"
                });
                return;
                // 如果用户id存在，且修改名字的id与该id相同，则代表是同一个人的用户名，重复名字
                // 不影响结果
            } else if (req.body.id) {
                if (req.body.id == JSON.parse(JSON.stringify(...result)).user_id) {
                    res.json({
                        isExist: false,
                        msg: "用户名正确！"
                    });
                } else {
                    res.json({
                        isExist: true,
                        msg: "用户名已存在！"
                    });
                }
            }

        }
    })
}

module.exports = validateName