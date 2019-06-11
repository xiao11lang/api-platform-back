const {insert,update,findByName}=require('../model/user')
async function register(ctx){
    const {name,pass}=ctx.request.body
    let res=await findByName(name)
    if(res.length){
        ctx.status=500;
        ctx.body={
            detail:'用户名已经被注册'
        }
    }else{
        await insert({
            name:name,
            password:pass
        })
        ctx.body={
            status:1,
            detail:'注册成功'
        }
    }
    
}
module.exports=[{
    handler:register,
    path:'/register',
    method:"post"
}]