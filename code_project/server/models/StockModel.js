const {Sequelize,sequelize}= require('../config/db.config');
// const PurchasingModel = require('../models/PurchasingModel');
//
const StockModel = sequelize.define('stocks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING, //商品名称
        validate: {
            notEmpty: true
        }
    },
    supplier:{
        type: Sequelize.STRING, //供应商
    },
    category: {
        type: Sequelize.STRING, // 商品类别
    },
    // origin:{
    //     type: Sequelize.STRING,//商品类别
    // },
    // batch_id:{
    //     type: Sequelize.STRING,
    // },
    approval:{
        type: Sequelize.STRING,//批准文号
    },
    // packaging:{
    //     type: Sequelize.STRING,
    // },
    item_spec:{
        type: Sequelize.STRING,//商品规格
    },
    price:{
        type: Sequelize.FLOAT,//商品价格
    },
    detail:{
        type: Sequelize.STRING,//产品详细描述
    },
    introduction: {
        type: Sequelize.STRING,//产品简介
    },
    cover: {
        type: Sequelize.STRING,//封面
    },
    editTime:{
        type: Sequelize.DATE,//编辑时间
    },
    item_count:{
        type: Sequelize.STRING, //商品个数
    },
    // product_expiry_date:{
    //     type: Sequelize.STRING,
    // },
    // productsnum: {
    //     type: Sequelize.STRING,//商品个数
    // }
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

});
// StockModel.hasMany(PurchasingModel, { foreignKey: 'stock_id' });
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
StockModel.sync().then(() => {

    console.log("stocks表已经同步");
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

module.exports = StockModel