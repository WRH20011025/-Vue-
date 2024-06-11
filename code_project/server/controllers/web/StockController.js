const StockService = require('../../services/web/StockService')

const StockController = {
    getList:async (req, res)=> {
        const result = await StockService.getList({id: req.params.id})

        res.send({
            ActionType: "OK",
            data: result
        })
    },
}

module.exports = StockController;