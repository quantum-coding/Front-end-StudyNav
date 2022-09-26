const connection = require("../connect")

const register = (req, res) => {
    var addSql = 'INSERT INTO userinfo(user_id,user_name,user_psd,user_avatar,register_time,user_hobbies,user_email,user_introduction,user_area) VALUES(?,?,?,?,?,?,?,?,?) '
    var addSqlParams = [req.body.userId, req.body.username, req.body.password, "", req.body.registerTime, "", "", "", ""]
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        } else {
            res.sendStatus(200);
        }
    })
}

module.exports = register