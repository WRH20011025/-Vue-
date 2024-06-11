const NewsModel = require('../../models/NewsModel')

const NewsService = {

    getList:async ({id})=> {
        return id?NewsModel.findOne({
                where: {id},
            }
        ):NewsModel.findAll({
            where: {
                isPublish:1
            },
            order: [['editTime', 'DESC']]
        })
    },
}

module.exports = NewsService