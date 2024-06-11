const NewsService = require("../../services/admin/NewsService")

/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
const NewsController = {
    add:async (req,res)=>{
        // console.log(req.file,req.body)
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        const {title,content,category,isPublish} = req.body
        //调用 service进行添加
        await NewsService.add({
            title,content,
            category:Number(category)
            ,
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    updateList:async(req,res)=>{
        const cover = req.file?`/newsuploads/${req.file.filename}`:""
        const {title,content,category,isPublish,id} = req.body
        //调用 service进行添加
        await NewsService.updateList({
            id,
            title,content,
            category:Number(category)
            ,
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })

    },
    getList:async (req,res)=>{
        const result =await NewsService.getList({id:req.params.id})
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    delList:async (req,res)=>{
        await NewsService.delList({id:req.params.id})
        res.send({
            ActionType:"OK"
        })
    },

    publish:async (req,res)=>{
        await NewsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK",
        })
    }
}

module.exports = NewsController