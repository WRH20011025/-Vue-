const {Sequelize,sequelize}= require('../config/db.config');
// const PurchasingModel = require('../models/PurchasingModel');
//
const NewsModel = sequelize.define('news', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING, //公告名称
        validate: {
            notEmpty: true
        }
    },
    content: {
        type: Sequelize.STRING(5000),
    },
    category: {
        type: Sequelize.INTEGER,//类别,1,2,3
    },
    cover:{
        type: Sequelize.STRING,//封面
    },
    isPublish:{
        type: Sequelize.INTEGER, // 未发布为0, 已发布为1
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
NewsModel.sync().then(() => {

    console.log("news表已经同步");
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

module.exports = NewsModel