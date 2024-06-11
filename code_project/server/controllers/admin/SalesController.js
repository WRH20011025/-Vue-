const SalesService = require('../../services/admin/SalesService')
const JWT=require('../../util/JWT')
const {Sequelize} = require("../../config/db.config");
// const StockModel = require("../../models/StockModel");
const SalesController = {
    add: async (req, res) => {
        console.log(req.body);
        const {selectedProducts,totalAmount,username}= req.body;
        await SalesService.add({selectedProducts,totalAmount,username,editTime:new Date()})
        res.send({

            ActionType: "ok",

        })
    },
    getList:async (req, res)=> {
        const result = await SalesService.getList({id: req.params.id})

        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // updateList: async (req, res) => {
    //     // console.log(req.body, req.file);
    //
    //     const result = await PurshasingService.autoadd({
    //         id:req.params.id,
    //         editTime:new Date()
    //     })
    //     res.send({
    //
    //         ActionType: "ok",
    //         data: result
    //
    //     })
    //     // 调用service 模块更新数据
    // },
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

        const result = await SalesService.delList({id:req.params.id})
        res.send({
            ActionType: "ok",
            data: result
        })

    },
    // getForm:async (req, res)=> {
    //     const result = await PurshasingService.getForm(req.body)
    //
    //     res.send({
    //         ActionType: "ok",
    //         data: result
    //     })
    // },
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

module.exports = SalesController;