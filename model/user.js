const {STRING}=require('sequelize')
const sequelize=require('./instance')
const User=sequelize.define('user',{
    name:{
        type:STRING(30)
    },
    password:{
        type:STRING(30)
    }
})
function findByName(name){
    return User.findAll({
        where:{
            name:name
        }
    })
}
function insert(data){
    return User.sync().then(()=>{
        return User.create(data)
    })
}
function update(id){
    return User.update({
        where:{
            id:id
        }
    })
}
module.exports={
    insert,update,findByName
}