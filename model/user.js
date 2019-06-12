const {STRING}=require('sequelize')
const sequelize=require('./instance')
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