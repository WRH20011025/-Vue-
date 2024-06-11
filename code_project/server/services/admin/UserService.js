const UserModel = require('../../models/UserModel')
const {UpdateOptions} = require("sequelize/lib/model");


const UserService = {
    login: async ({username, password}) => {
        return UserModel.findOne({
            where: {
                username: username,
                password: password
            }
        })

    },
    upload: async ({id, username, introduction, gender, avatar}) => {
        if (avatar) {
            return UserModel.update(
                {username, introduction, gender, avatar},
                {where: {id}},
            );
        } else {
            return UserModel.update(
                {username, introduction, gender},
                {where: {id}},
            );
        }
    },
    add: async ({username, introduction, gender, avatar, password, role}) => {
        return UserModel.create({username, introduction, gender, avatar, password, role})

    },
    getList:async ({id})=> {
        return id?UserModel.findOne({
            where: {id},
            attributes: ['id','username','password','introduction','role']
            }
        ):UserModel.findAll({
            attributes: ['id','username','gender','introduction','role','avatar']
        })
    },
    putList:async (body)=> {
        const id =body.id;
        return UserModel.update(
            body,
            {
                where: {id}
        },
        )

    },

    delList:async ({id})=> {
        return UserModel.destroy({
            where:{id}
        })
    }

}

module.exports = UserService