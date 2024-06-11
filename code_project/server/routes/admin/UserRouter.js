var express = require('express');
const UserController = require('../../controllers/admin/UserController')

var UserRouter = express.Router();
// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET home page. */
UserRouter.post("/adminapi/user/login",UserController.login)
UserRouter.post("/adminapi/user/upload",upload.single('file'),UserController.upload)
UserRouter.post("/adminapi/user/add",upload.single('file'),UserController.add)
// 实现用户列表的增删改查
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)
UserRouter.get("/adminapi/user/list",UserController.getList)
UserRouter.get("/adminapi/user/list/:id",UserController.getList)
UserRouter.put("/adminapi/user/list/:id",UserController.putList)
// UserRouter.get("/adminapi/user/home",(req,res)  =>{
//     res.send({ok:1})
// })

module.exports = UserRouter;
