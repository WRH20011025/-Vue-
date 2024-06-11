const NewsModel = require("../../models/NewsModel")
const StockModel = require("../../models/StockModel");
const UserModel = require("../../models/UserModel");

const NewsService = {
    add: async ({title, content, category, cover, isPublish, editTime}) => {
        return NewsModel.create({
            title, content, category, cover, isPublish, editTime
        })
    },

    updateList: async ({id, title, content, category, isPublish, cover, editTime}) => {
        if (cover) {
            return NewsModel.update({
                    title, content, category, isPublish, cover, editTime
                },
                {where: {id}},
            )
        } else {
            return NewsModel.update({
                    title, content, category, isPublish, editTime
                },
                {where: {id}},
            )
        }
    },

    // getList: async ({id}) => {
    //     return id ? NewsModel.find({id}) : NewsModel.find({})
    // },
    getList: async ({id}) => {
        return id ? NewsModel.findOne({
                where: {id},
                // attributes: ['id','username','password','introduction','role']
            }
        ) : NewsModel.findAll({

            // attributes: ['id','username','gender','introduction','role','avatar']
        })
    },
    delList: async ({id}) => {
        return NewsModel.destroy({
            where: {id}
        })
    },

    publish: async ({id, isPublish, editTime}) => {
        return NewsModel.update({
                isPublish,
                editTime
            },
            {where: {id}},
        )
    }
}

module.exports = NewsService