const StockModel = require('../../models/StockModel')
const {UpdateOptions} = require("sequelize/lib/model");
const UserModel = require("../../models/UserModel");
const PurchasingModel = require('../../models/PurchasingModel')
const Sequelize = require('sequelize');

const StockService = {

    add: async ({title,supplier,category,approval,item_spec,price,detail,introduction,item_count,editTime,cover}) => {
        return StockModel.create({title,supplier,category,approval,item_spec,price,detail,introduction,item_count,editTime,cover})
    },
    getList:async ({id})=> {
        return id?StockModel.findOne({
                where: {id},
                // attributes: ['id','username','password','introduction','role']
            }
        ):StockModel.findAll({
            where: {
                is_deleted: false
            }
            // attributes: ['id','username','gender','introduction','role','avatar']
        })
    },
    update:async ({id, item_count,editTime})=>{
        return StockModel.update(
            {item_count,editTime},
            {where:{id}}
        );
    },
    updateList:async ({id,title,category,supplier,approval,item_spec,price,detail,introduction,item_count,editTime,cover})=>{
        if (cover) {
            return StockModel.update(
                {title,supplier,approval,category,item_spec,price,detail,introduction,item_count,editTime,cover},
                {where: {id}},
            );
        } else {
            return StockModel.update(
                {title,supplier,approval,category,item_spec,price,detail,introduction,item_count,editTime},
                {where: {id}},
            );
        }

    },

    // putList:async (body)=> {
    //     const id =body.id;
    //     return StockModel.update(
    //         body,
    //         {
    //             where: {id}
    //         },
    //     )
    //
    // },
    //
    delList:async ({id})=> {
        return StockModel.update({ is_deleted: true }, {
            where: {
                id
            }
        });
    },
    getExpiredItems: async () => {
        const currentDate = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(currentDate.getDate() + 7); // 获取7天后的日期
        const stocks = await PurchasingModel.findAll({
            include: [{
                model: StockModel,
                as: 'stock',
                attributes: ['supplier', 'title', 'item_count', 'cover']
            }]
        });
        const expiredStocks = stocks.filter(stock => {
            const expiryDate = new Date(stock.expiry);
            // 只显示已过期的商品和临近7天过期的商品
            return expiryDate < currentDate || (expiryDate >= currentDate && expiryDate <= sevenDaysLater);
        });
        return expiredStocks;
    }

}

module.exports = StockService