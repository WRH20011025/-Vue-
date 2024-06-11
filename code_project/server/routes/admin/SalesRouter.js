var express = require('express');
const SalesController = require('../../controllers/admin/SalesController')

var SalesRouter = express.Router();
// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/Salesuploads/' })

/* GET home page. */
// StockRouter.post("/adminapi/user/login",StockController.login)
// SalesRouter.post("/adminapi/purchasing/update/:id",SalesController.updateList)
SalesRouter.post("/adminapi/sales/add",upload.single('file'),SalesController.add)
// // 实现用户列表的增删改查
SalesRouter.delete("/adminapi/sales/list/:id",SalesController.delList)
// PurshasingRouter.get("/adminapi/purchasing/form",PurshasingController.getForm)
SalesRouter.get("/adminapi/sales/list",SalesController.getList)
SalesRouter.get("/adminapi/sales/list/:id",SalesController.getList)
// StockRouter.put("/adminapi/user/list/:id",StockController.putList)
// UserRouter.get("/adminapi/user/home",(req,res)  =>{
//     res.send({ok:1})
// })

module.exports = SalesRouter;
