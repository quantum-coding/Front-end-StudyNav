const connection = require("../connect")
const fs = require("fs")
// 图片删除函数

function deleteImage(imgPath) {
    // 如果用户头像图片存在且用户的头像地址也和原来的不同，就删除图片
    let serverPath = "http://127.0.0.1:3000/"
    // 获得文件名后缀
    let path = imgPath.substring(serverPath.length)
    // 删除相关路径下对应文件名的文件
    fs.unlink(path, function (err) {
        if (err) {
            console.log(err)
        }
        return
    })
}



const initResList = (req, res) => {
    // 获取推荐者的id,注意获取get请求当中的参数要使用query方法
    let commenderId = req.query["commenderId"]
    let state = req.query["type"]

    let sqlParams = []


    var querySql = "SELECT resId, resName, resCover, DATE_FORMAT(submitTime, '%Y-%m-%d %H:%i:%s') as submitTime, state FROM resinfo WHERE commenderId = ?"

    if (state != "all") {
        querySql = querySql + " AND state = ?"
        sqlParams = [commenderId, state]
    } else {
        sqlParams = [commenderId]
    }

    connection.query(querySql, sqlParams, function (err, result) {
        if (err) {
            console.log('[QUERY ERROR] - ', err.message);
            return;
        } else {
            // console.log(result)
            res.json({
                resList: JSON.parse(JSON.stringify(result))
            })
        }
    })
}


const addResource = (req, res) => {
    var addSql = 'INSERT INTO resinfo(resId,resName,resDescribe,resAddress,resLabels,resChannel,resCover,resDetail,submitTime,commenderId,visit,likes,share,state) VALUES(?,?,?,?,?,?,?,?,?,?,0,0,0,"audit") '
    var {
        resId,
        resName,
        resDescribe,
        resAddress,
        resLabels,
        resChannel,
        resCover,
        resDetail,
        commendId,
        submitTime
    } = req.body

    const addSqlParams = [resId, resName, resDescribe, resAddress, resLabels.toString(), resChannel, resCover, resDetail, submitTime, commendId]
    console.log(addSqlParams)
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        } else {
            res.sendStatus(200);
        }
    })
}

const getResDetail = (req, res) => {
    let sqlParams = req.query['resId']

    let querySql = 'SELECT * FROM resinfo WHERE resId = ?'

    connection.query(querySql, sqlParams, function (err, result) {
        if (err) {
            console.log('[QUERY ERROR] - ', err.message);
            return;
        } else {
            let r = JSON.parse(JSON.stringify(...result))
            r.resLabels = r.resLabels.split(",")

            res.json({
                resDetail: r
            })
        }
    })

}

const updateRes = async (req, res) => {
    // 根据用户id获取用户原先存在的头像地址
    let deleteSql = "SELECT resCover FROM resinfo WHERE resId = ? "
    await connection.query(deleteSql, req.body.resInfo.resId, function (err, result) {
        if (err) {
            console.log('[delete ERROR] - ', err.message);
            return;
        } else {
            let { resCover } = JSON.parse(JSON.stringify(...result))
            if (resCover && resCover != req.body.resInfo.resCover) {
                // 如果用户头像图片存在且用户的头像地址也和原来的不同，就删除图片
                let serverPath = "http://127.0.0.1:3000/"
                // 获得文件名后缀
                let path = resCover.substring(serverPath.length)
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

    let updateSql = "UPDATE resinfo SET " +
        "resName = ?, " +
        "resDescribe = ?, " +
        "resAddress = ?, " +
        "resLabels = ?, " +
        "resChannel = ?, " +
        "resCover = ?, " +
        "resDetail = ? " +
        "WHERE resId = ?"
    let sqlParams = []
    let {
        resName,
        resDescribe,
        resAddress,
        resLabels,
        resChannel,
        resCover,
        resDetail,
        resId
    } = req.body.resInfo

    sqlParams = [resName, resDescribe, resAddress, resLabels, resChannel, resCover, resDetail, resId]


    await connection.query(updateSql, sqlParams, function (err, result) {
        if (err) {
            console.log('[update ERROR] - ', err.message);
            return;
        } else {
            console.log("资源信息修改成功")
            res.json({
                code: 200,
                msg: "资源信息更新成功"
            });
        }
    })
}

const deleteRes = async (req, res) => {
    let sqlParams = req.query['resId']
    let deleteSql = "SELECT resCover from resinfo WHERE resId = ?"
    await connection.query(deleteSql, sqlParams, function (err, result) {
        if (err) {
            console.log('[IMAGE delete ERROR] - ', err.message);
            return;
        } else {
            let { resCover } = JSON.parse(JSON.stringify(...result));
            if (resCover) {
                deleteImage(resCover);
                console.log("资源图片删除成功修改成功");
            }
        }
    })

    deleteSql = "DELETE FROM resinfo WHERE resId = ?"
    await connection.query(deleteSql, sqlParams, function (err, result) {
        if (err) {
            console.log('[delete ERROR] - ', err.message);
            return;
        } else {
            res.json({
                code: 200,
                msg: "删除成功"
            })
        }
    })

}

module.exports = { initResList, addResource, getResDetail, updateRes, deleteRes }