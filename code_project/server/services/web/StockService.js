const StockModel = require('../../models/StockModel')

const StockService = {

    getList:async ({id})=> {
        return id?StockModel.findOne({
                where: {id},
            }
        ):StockModel.findAll({
            where: {
                is_deleted: false
            },
            order: [['editTime', 'DESC']]
        })
    },
}

module.exports = StockService