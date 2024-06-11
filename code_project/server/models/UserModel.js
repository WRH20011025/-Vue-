const {Sequelize,sequelize}= require('../config/db.config');
//
const UserModel = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    gender:{
        type: Sequelize.STRING,
    },
    introduction: {
        type: Sequelize.STRING,
    },
    avatar: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    }

});
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
UserModel.sync().then(() => {

    console.log("users表已经同步");
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

module.exports = UserModel