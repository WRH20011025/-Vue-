var express = require('express');
const NewsController = require('../../controllers/web/NewsController')
var NewsRouter = express.Router();

NewsRouter.get("/webapi/news/list",NewsController.getList)
NewsRouter.get("/webapi/news/list/:id",NewsController.getList)

module.exports = NewsRouter;
