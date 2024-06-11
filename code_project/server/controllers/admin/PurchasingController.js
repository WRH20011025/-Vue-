const PurshasingService = require('../../services/admin/PurshasingService')
const JWT=require('../../util/JWT')
const {Sequelize} = require("../../config/db.config");
const StockService = require("../../services/admin/StockService");
// const StockModel = require("../../models/StockModel");
const PurshasingController = {
    add: async (req, res) => {
        console.log(req.body);
        const {title,origin,batch_id,packaging,item_count,cost,expiry,location,phone}= req.body;

        await PurshasingService.add({title,origin,batch_id,packaging,item_count,cost,expiry,location,phone,editTime:new Date()})
        res.send({

            ActionType: "ok",

        })
    },
    getList:async (req, res)=> {
        const result = await PurshasingService.getList({id: req.params.id})

        res.send({
            ActionType: "ok",
            data: result
        })
    },
    updateList: async (req, res) => {
        // console.log(req.body, req.file);
        const {id,origin,batch_id,packaging,cost,location,phone,expiry}= req.body;
        await PurshasingService.updateList({
            id,origin,batch_id,packaging,cost,location,phone,expiry,
            editTime:new Date()
        })
        res.send({

            ActionType: "ok",

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

        const result = await PurshasingService.delList({id:req.params.id})
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

module.exports = PurshasingController;