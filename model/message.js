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
    to:{
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
            to:id
        }
    })
}
module.exports={insert,findByUesrId}