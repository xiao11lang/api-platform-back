const { insert,getById } = require("../model/apply");
async function addApply(ctx) {
  const { id } = ctx.state.user;
  const { teamId,masterId } = ctx.request.body;
  console.log(ctx.request.body)
  await insert({
    from_id: id,
    team_id: teamId,
    master_id:masterId
  });
  ctx.body={
      status:1,
      detail:'申请成功'
  }
}
async function getApply(ctx) {
    const id=ctx.state.user.id
    let res=await getById(id)
    ctx.body={
        status:1,
        detail:'查询成功',
        list:res
    }
  }
  
module.exports=[{
    path:'/addApply',
    handler:addApply,
    method:'post'
},{
    path:'/getApply',
    handler:getApply,
    method:'get'
}]