var express = require('express');
const StockController = require('../../controllers/admin/StockController')

var StockRouter = express.Router();
// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/Stockuploads/' })

/* GET home page. */
// StockRouter.post("/adminapi/user/login",StockController.login)
StockRouter.post("/adminapi/stock/list",upload.single('file'),StockController.updateList)
StockRouter.post("/adminapi/stock/add",upload.single('file'),StockController.add)
// // 实现用户列表的增删改查
StockRouter.delete("/adminapi/stock/list/:id",StockController.delList)
StockRouter.get("/adminapi/stock/list",StockController.getList)
StockRouter.get("/adminapi/stock/list/:id",StockController.getList)
StockRouter.get("/adminapi/stock/expired",StockController.expList)
StockRouter.put("/adminapi/stock/update/:id",StockController.update)
// UserRouter.get("/adminapi/user/home",(req,res)  =>{
//     res.send({ok:1})
// })


module.exports = StockRouter;
