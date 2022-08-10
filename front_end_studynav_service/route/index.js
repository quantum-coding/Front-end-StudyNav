const connection = require("../connect")

const getMenuList = async (req, res) => {

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

}

module.exports = getMenuList