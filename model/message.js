const {STRING,INTEGER}=require('sequelize')
const sequelize=require('./instance')
const Message=sequelize.define('message',{
    type:{
        type:STRING(30)
    },
    title:{
        type:STRING(30)
    },
    content:{
        type:STRING(1000),
    },
    toWho:{
        type:INTEGER
    }
})
function insert(data){
    return Message.sync().then(()=>{
        return Message.create(data)
    })
}
function findByUesrId(id){
    return Message.findAll({
        where:{
            toWho:id
        }
    })
}
function getDifferentMesCount(id){
    return sequelize.query(`select type,count(distinct(type)) count from messages group by type,toWho having toWho=${id}`).then((res)=>{
        return res[0].reduce((pre,cur)=>{
            pre[cur.type]=cur.count
            return pre
        },{})
    }).then((res)=>{
        ['official','project','person'].forEach((type)=>{
            if(!res[type]){
                res[type]=0
            }
        })
        return res
    })
}
module.exports={insert,findByUesrId,getDifferentMesCount}