const PurchasingModel = require('../../models/PurchasingModel')
const {UpdateOptions} = require("sequelize/lib/model");
const StockModel = require("../../models/StockModel");
// const {model} = require("mongoose");


const PurshasingService = {

    add: async ({title, origin, batch_id, item_count, packaging, editTime, cost, expiry, location,phone}) => {
        const result = await StockModel.findOne({
            where: {title: title},
            attributes: ['id']
        });
        const stock_id = result.dataValues.id;
        StockModel.increment('item_count', {
            by: item_count,
            where: {id: stock_id}
        })
        return PurchasingModel.create({
            stock_id,
            origin,
            batch_id,
            packaging,
            editTime,
            item_count,
            cost,
            expiry,
            location,
            phone
        })
    },
    getList: async ({id}) => {
        return id ? await PurchasingModel.findOne({
            where: {id},
            // attributes: ['id', 'item_count', 'cost', 'batch_id', 'editTime','expiry','phone'], // 指定查询的字段
            include: [{
                model: StockModel,
                as: 'stock',
                attributes: ['supplier', 'title','item_count','cover'] // 在关联模型中指定查询的字段
            }]
        }) : await PurchasingModel.findAll({
            attributes: ['id', 'item_count', 'cost', 'batch_id', 'editTime','origin','location','expiry','phone'], // 指定查询的字段
            include: [{
                model: StockModel,
                as: 'stock',
                attributes: ['supplier', 'title','item_count','cover']
            }]
        });

    },
    // autoadd: async ({id, editTime}) => {
    //     return PurchasingModel.create({
    //         stock_id,
    //         origin,
    //         batch_id,
    //         packaging,
    //         editTime,
    //         item_count,
    //         cost,
    //         expiry,
    //         location,
    //         phone
    //     })
    // },
    updateList:async ({id,origin,batch_id,packaging,cost,location,phone,expiry,editTime})=>{
        return PurchasingModel.update(
            {id,origin,batch_id,packaging,cost,location,phone,expiry,editTime},
            {where: {id}},
        );
    },
    getForm: async () => {
        return PurchasingModel.findAll({

            attributes: ['id', 'batch_id', 'packaging', 'editTime', 'origin'],
            include: [{
                model: StockModel,
                as: 'purch',
                attributes: ['id']

            }],
            raw: true
        })
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
        return PurchasingModel.destroy({
            where:{id}
        })
    }

}

module.exports = PurshasingService