const connection = require("../connect")
const busboy = require("busboy")
const fs = require("fs")

const upload = (req, res) => {
    const busBoy = busboy({ headers: req.headers })

    let data = {
        filename: "", // 图片名
        encoding: "", // 图片编码
        mimeType: "", // 图片格式
        imageUrl: "" // 存储路径
    }

    // 将文件流链接到busboy
    req.pipe(busBoy)

    // 监听文件上传事件
    busBoy.on("file", (fieldname, file, info) => {
        // 创建文件的新名字，加上时间防止重名
        let filePath = new Date().getTime() + info.filename
        data = { ...info, filename: filePath }
        console.log(data)
        // 创建可写流
        let writeStream = fs.createWriteStream("./user_avatar/" + filePath)

        file.on("data", function (data) {
            writeStream.write(data)
            console.log("文件写入中。。。。")
        })

        file.on("end", function () {
            writeStream.end()
            console.log("图片写入成功！")
        })
    })

    busBoy.on("finish", function () {
        data.imageUrl = "http://127.0.0.1:3000/user_avatar/" + data.filename
        res.json({
            code: 200,
            msg: "图片上传成功",
            data: data
        })
    })


}

module.exports = upload