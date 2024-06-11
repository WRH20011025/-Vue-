const SalesModel = require('../../models/SalesModel')
const {UpdateOptions} = require("sequelize/lib/model");
const StockModel = require("../../models/StockModel");
// const {model} = require("mongoose");


const SalesService = {

    add: async ({username, editTime,totalAmount,selectedProducts }) => {
        selectedProducts = JSON.parse(selectedProducts);

        for(let product of selectedProducts){
            console.log(product)
            let productResult = await StockModel.findOne({
                where: {title: product.title},
                attributes: ['id','item_count']
            });
            product.id = productResult.dataValues.id;
            let new_item_count = productResult.dataValues.item_count - product.quantity;
            await StockModel.update({ item_count: new_item_count }, {
                where: { id: product.id }
            });
        }
        return SalesModel.create({
            totalAmount,
            editTime,
            selectedProducts,
            username
        })
    },
    getList: async ({id}) => {
        return id ? await SalesModel.findOne({
            where: {id},
            attributes: ['id', 'username', 'totalAmount', 'selectedProducts', 'editTime'], // 指定查询的字段
        }) : await SalesModel.findAll({
            attributes: ['id', 'username', 'totalAmount', 'selectedProducts', 'editTime'], // 指定查询的字段
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
    //         location
    //     })
    // },
    // updateList:async ({id,title, detail,origin,supplier,batch_id,approval,packaging,item_spec,price, introduction, editTime,cover,item_count,product_expiry_date})=>{
    //     if (cover) {
    //         return PurchasingModel.update(
    //             {title, detail,origin,supplier,batch_id,approval,packaging,item_spec,price, introduction, editTime,cover,item_count,product_expiry_date},
    //             {where: {id}},
    //         );
    //     } else {
    //         return PurchasingModel.update(
    //             {title, detail,origin,supplier,batch_id,approval,packaging,item_spec,price, introduction, editTime,item_count,product_expiry_date},
    //             {where: {id}},
    //         );
    //     }
    //
    // },
    // getForm: async () => {
    //     return PurchasingModel.findAll({
    //
    //         attributes: ['id', 'batch_id', 'packaging', 'editTime', 'origin'],
    //         include: [{
    //             model: StockModel,
    //             as: 'purch',
    //             attributes: ['id']
    //
    //         }],
    //         raw: true
    //     })
    // },
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
        return SalesModel.destroy({
            where:{id}
        })
    }

}

module.exports = SalesService