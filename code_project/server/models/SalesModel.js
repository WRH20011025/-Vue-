const {Sequelize,sequelize}= require('../config/db.config');
// const PurchasingModel = require('../models/PurchasingModel');
//
const SalesModel = sequelize.define('sales', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING, //用户名称
        validate: {
            notEmpty: true
        }
    },
    totalAmount: {
        type: Sequelize.FLOAT, // 订单总价
        validate: {
            notEmpty: true
        }
    },
    selectedProducts: {
        type: Sequelize.TEXT, // 订单详情
        get() {
            return JSON.parse(this.getDataValue('selectedProducts'));
        },
        set(value) {
            this.setDataValue('selectedProducts', JSON.stringify(value));
        }
    },
    editTime:{
        type: Sequelize.DATE,//编辑时间
    },
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
SalesModel.sync().then(() => {

    console.log("sales表已经同步");
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

module.exports = SalesModel