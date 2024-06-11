var express = require('express');
const NewsController = require('../../controllers/admin/NewsController')

var NewsRouter = express.Router();
// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

/* GET home page. */
// StockRouter.post("/adminapi/user/login",StockController.login)
NewsRouter.post("/adminapi/news/list",upload.single('file'),NewsController.updateList)
NewsRouter.post("/adminapi/news/add",upload.single('file'),NewsController.add)
// // 实现用户列表的增删改查
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)
// NewsRouter.get("/adminapi/news/expired",NewsController.expList)
// UserRouter.get("/adminapi/user/home",(req,res)  =>{
//     res.send({ok:1})
// })


module.exports = NewsRouter;
