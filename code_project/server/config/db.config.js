const { Sequelize } = require('sequelize');
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('db', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
// 创建MySQL连接
// const connection = mysql.createConnection({
//     host: 'localhost', // 数据库的主机名
//     user: 'root', // 数据库的用户名
//     password: '123456', // 数据库的密码
//     database: 'db' // 数据库名称
// });
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
// 连接数据库
// connection.connect((err) => {
//     if (err) {
//         console.error('连接失败');
//         return;
//     }
//     console.log('连接成功');
// });

// // 关闭数据库连接
// connection.end();
// // 强制关闭
// // connection.destroy();
// sequelize.query("SELECT * FROM users",(err,result)=>{
//     if (err) {
//         console.error('查询失败'+err.message);
//         return;
//     }
//     console.log('result: '+result);
// })

module.exports = {Sequelize,sequelize}