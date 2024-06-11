var express = require('express');
const StockController = require('../../controllers/web/StockController')
const SalesController = require("../../controllers/admin/SalesController");
var StockRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/Salesuploads/' })
StockRouter.get("/webapi/stock/list",StockController.getList)
StockRouter.get("/webapi/stock/list/:id",StockController.getList)
StockRouter.post("/webapi/stock/add",upload.single('file'),SalesController.add)
module.exports = StockRouter;
