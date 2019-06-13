const { findByUesrId } = require("../model/message");
async function getMessage(ctx) {
  const { id } = ctx.request.body;
  let res = await findByUesrId(id);
  res = res.map(value => value.dataValues);
  ctx.body = {
    status: 1,
    detail: "获取消息成功",
    list: res
  };
}
module.exports=[{
    method:'post',
    handler:getMessage,
    path:'/getMessage'
}]