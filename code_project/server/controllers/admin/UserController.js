const UserService = require('../../services/admin/UserService')
const JWT=require('../../util/JWT')
const {Sequelize} = require("../../config/db.config");
const UserController = {
    login: async (req, res) => {
        try {
            const result = await UserService.login(req.body);
            if (result.length === 0) {
                res.send({
                    code: "-1",
                    error: "用户名密码不匹配"
                });
            } else {

                //生成token
                const token = JWT.generate({
                    id: result.id,
                    username: result.username
                }, "1d")

                res.header("Authorization", token)
                res.send({
                    ActionType: "OK",
                    data: {

                        username: result.username,
                        gender: result.gender ? result.gender : 0,
                        introduction: result.introduction,
                        avatar: result.avatar,
                        role: result.role
                    }

                });
            }
        } catch (error) {
            res.send({
                code: "-1",
                error: error.message
            });
        }

    },
    upload: async (req, res) => {
        console.log(req.body, req.file);
        const {username, gender, introduction} = req.body;
        const token = req.headers["authorization"].split(" ")[1]
        // console.log(token)
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        var payload = JWT.verify(token)
        // console.log(payload.id)
        await UserService.upload({id: payload.id, username, gender, introduction, avatar})
        if (avatar) {
            res.send({

                ActionType: "ok",
                data: {
                    username, gender, introduction, avatar
                }
            })
        } else {
            res.send({
                ActionType: "ok",
                data: {
                    username, gender, introduction
                }
            })
        }


        // 调用service 模块更新数据
    },
    add: async (req, res) => {
        console.log(req.body, req.file);
        const {username, gender, introduction, role, password} = req.body;
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""


        await UserService.add({username, gender, introduction, avatar, role, password})
        res.send({

            ActionType: "ok",

        })
    },
    getList:async (req, res)=> {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    putList:async (req, res)=> {
        const result = await UserService.putList(req.body)
        // console.log(req.params)
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    delList:async (req, res)=> {
        // console.log(req.params.id)

        const result = await UserService.delList({id:req.params.id})
        res.send({
            ActionType: "ok",
            data: result
        })

    }
}

// const UserController = {
//     login: async (req,res)=>{
//         var result = await UserService.login(req.body)
//         if(result.length===0){
//             res.send({
//                 code:"-1",
//                 error:"用户名密码不匹配"
//             })
//         }else{
//             res.send({
//                 ActionType:"OK"
//             })
//         }
//
//     }
// }

module.exports = UserController;