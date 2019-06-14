const {STRING}=require('sequelize')
const sequelize=require('./instance')
const message=require('./message')
const User=sequelize.define('user',{
    name:{
        type:STRING(30)
    },
    password:{
        type:STRING(30)
    },
    sex:{
        type:STRING(10),
        defaultValue:'male'
    },
    avatar:{
        type:STRING(100)
    },
})
User.afterCreate(user=>{
    message.insert({
        type:'official',
        title:'欢迎进入API Master',
        content:`尊敬的${user.dataValues.name}您好，欢迎进入API Master。如果您有任何使用上的问题，请联系我们的客服人员，感谢您的使用。`,
        toWho:user.dataValues.id
    })
})
function findByName(name){
    return User.findAll({
        where:{
            name:name
        }
    })
}
function findById(id){
    return User.findAll({
        where:{
            id:id
        }
    })
}
function insert(data){
    return User.sync().then(()=>{
        return User.create(data)
    })
}
function update(id,values){
    return User.update(values,{
        where:{
            id:id
        }
    })
}
module.exports={
    insert,update,findByName,findById
}