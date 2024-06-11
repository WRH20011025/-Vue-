var express = require('express');
const PurshasingController = require('../../controllers/admin/PurchasingController')

var PurshasingRouter = express.Router();
// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/Purchasinguploadsuploads/' })

/* GET home page. */
// StockRouter.post("/adminapi/user/login",StockController.login)
PurshasingRouter.post("/adminapi/purchasing/update",upload.single('file'),PurshasingController.updateList)
PurshasingRouter.post("/adminapi/purchasing/add",upload.single('file'),PurshasingController.add)
// // 实现用户列表的增删改查
PurshasingRouter.delete("/adminapi/purchasing/list/:id",PurshasingController.delList)
// PurshasingRouter.get("/adminapi/purchasing/form",PurshasingController.getForm)
PurshasingRouter.get("/adminapi/purchasing/list",PurshasingController.getList)
PurshasingRouter.get("/adminapi/purchasing/list/:id",PurshasingController.getList)
// StockRouter.put("/adminapi/user/list/:id",StockController.putList)
// UserRouter.get("/adminapi/user/home",(req,res)  =>{
//     res.send({ok:1})
// })

module.exports = PurshasingRouter;
