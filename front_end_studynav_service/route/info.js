const connection = require("../connect")
const fs = require("fs")

let sql = "SELECT * FROM userinfo WHERE user_id = ?"

const info = (req, res) => {
    sqlParams = req.body.userId
    connection.query(sql, sqlParams, function (err, result) {
        if (err) {
            console.log('[query ERROR] - ', err.message);
            return;
        } else {
            // console.log(result)
            res.json({
                user: JSON.parse(JSON.stringify(...result))
            });
        }
    })
}

const updateInfo = async (req, res) => {
    // 根据用户id获取用户原先存在的头像地址
    let deleteSql = "SELECT user_avatar FROM userinfo WHERE user_id = ? "
    await connection.query(deleteSql, req.body.user.id, function (err, result) {
        if (err) {
            console.log('[delete ERROR] - ', err.message);
            return;
        } else {
            let { user_avatar } = JSON.parse(JSON.stringify(...result))
            if (user_avatar && user_avatar != req.body.user.avatar) {
                // 如果用户头像图片存在且用户的头像地址也和原来的不同，就删除图片
                let serverPath = "http://127.0.0.1:3000/"
                // 获得文件名后缀
                let path = user_avatar.substring(serverPath.length)
                console.log(path)
                // 删除相关路径下对应文件名的文件
                fs.unlink(path, function (err) {
                    if (err) {
                        console.log(err)
                    }
                    return
                })
            }
            return
        }
    })

    let updateSql = "UPDATE userinfo SET " +
        "user_name = ?, " +
        "user_email = ?, " +
        "user_hobbies = ?, " +
        "user_avatar = ?, " +
        "user_introduction = ?, " +
        "user_area = ? " +
        "WHERE user_id = ?"
    let sqlParams = []
    for (var k in req.body.user) {
        sqlParams.push(req.body.user[k])
    }
    // console.log(sqlParams)

    await connection.query(updateSql, sqlParams, function (err, result) {
        if (err) {
            console.log('[update ERROR] - ', err.message);
            return;
        } else {
            console.log("用户信息修改成功")
            res.json({
                code: 200,
                msg: "用户信息更新成功"
            });
        }
    })

}

module.exports = {
    info,
    updateInfo
}
