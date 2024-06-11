const {Sequelize,sequelize}= require('../config/db.config');
const StockModel = require('../models/StockModel')
//
const PurchasingModel = sequelize.define('purchasings', {
    stock_id: {
        type: Sequelize.INTEGER, // 商品ID
        // references: {
        //     // 这是引用另一个模型的方式
        //     model: StockModel,
        //
        //     // 这是你在另一个模型中引用的键
        //     key: 'id',
        // },
        allowNull: false
    },
    origin:{
        type: Sequelize.STRING,//商品产地
    },
    batch_id:{
        type: Sequelize.STRING,//生产批号
    },
    packaging:{
        type: Sequelize.STRING,//包装单位
    },
    editTime:{
        type: Sequelize.DATE,//编辑时间
    },
    item_count:{
        type: Sequelize.STRING,//进货数量
    },
    cost:{
        type: Sequelize.STRING,//进货价格
    },
    expiry:{
        type: Sequelize.STRING,//商品保质期
    },
    location:{
        type: Sequelize.STRING,//供货商地址
    },
    phone: {
        type: Sequelize.STRING, // 供货商电话
    }

    // product_expiry_date:{
    //     type: Sequelize.STRING, //供货商电话
    // },
    // productsnum: {
    //     type: Sequelize.STRING,//商品个数
    // }

});
// PurchasingModel.belongsTo(StockModel, { foreignKey: 'stock_id', as: 'stock' });
PurchasingModel.belongsTo(StockModel, { foreignKey: 'stock_id', as: 'stock' });
// PurchasingModel.belongsTo(StockModel,{as:'purch',foreignKey:'id'});//外键连接
// const  UserModel = sequelize.define('users',{
//     username :{
//         type:Sequelize.STRING,
//         validate:{
//             notEmpty:true
//         }
//     },
//     password :{
//         type:Sequelize.STRING,
//         validate: true
//     }
// })
// 注意: `force: true` 选项会在表存在时首先删除表{ force: true }
PurchasingModel.sync().then(() => {

    console.log("purchasings表已经同步");
    // 现在 `users` 表会与模型定义一致
    // return User.create({
    //     firstName: 'John',
    //     lastName: 'Hancock'
    // });
});
// const mysql = new{
//     username: String,
//     password: String,
//     gender:Number,//性别 0 1 2
//     introduction:String,//简介
//     avatar:String,
//     role:Number,
// }
// const UserMode1 = mysql.model("user",new Schema(UserType))

module.exports = PurchasingModel