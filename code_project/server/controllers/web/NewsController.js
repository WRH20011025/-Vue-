const NewsService = require('../../services/web/NewsService')

const NewsController = {
    getList:async (req, res)=> {
        const result = await NewsService.getList({id: req.params.id})
        res.send({
            ActionType: "OK",
            data: result
        })
    },
}

module.exports = NewsController;