const StockService = require('../../services/admin/StockService')
const JWT=require('../../util/JWT')
const {Sequelize} = require("../../config/db.config");
const StockController = {
    updateList: async (req, res) => {
        // console.log(req.body, req.file);
        const {id,title,supplier,category,approval,item_spec,price,detail,introduction,item_count}= req.body;
        const cover = req.file ? `/stockuploads/${req.file.filename}` : ""
        await StockService.updateList({
            id,title,supplier,approval,item_spec,price,detail,introduction,cover,item_count,category,
            editTime:new Date()
        })
        res.send({

            ActionType: "ok",

        })
        // 调用service 模块更新数据
    },
    update:async (req, res) => {
            const id = req.params.id; // 从URL中获取商品ID
            const { item_count } = req.body; // 从请求体中获取更新后的商品信息
            await StockService.update({
                id, item_count,
                editTime:new Date()
            })
            res.send({

                ActionType: "ok",

            })

    },
    add: async (req, res) => {
        // console.log(req.body, req.file);
        const {title,supplier,category,approval,item_spec,price,detail,introduction,item_count,originalCover}= req.body;
        const cover = req.file ? `/stockuploads/${req.file.filename}` : originalCover


        await StockService.add({
            title,supplier,approval,item_spec,price,detail,introduction,item_count,category,
            cover,
            editTime:new Date()})
        res.send({

            ActionType: "ok",

        })
    },
    getList:async (req, res)=> {
        const result = await StockService.getList({id: req.params.id})

        res.send({
            ActionType: "ok",
            data: result
        })
    },
    expList:async (req, res)=> {
        const result = await StockService.getExpiredItems();
        console.log(result)

        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // putList:async (req, res)=> {
    //     const result = await StockService.putList(req.body)
    //     // console.log(req.params)
    //     res.send({
    //         ActionType: "ok",
    //         data: result
    //     })
    // },
    delList:async (req, res)=> {
        // console.log(req.params.id)

        const result = await StockService.delList({id:req.params.id})
        res.send({
            ActionType: "ok",
            data: result
        })

    },


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

module.exports = StockController;