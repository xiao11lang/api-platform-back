const {
  findByUesrId,
  getMesListByType,
  setMesRead,
  getDifferentMesCount,
  deleteMes
} = require("../model/message");
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
async function getMesCount(ctx){
  //const {id}=ctx.request.body
  const {id}=ctx.state.user
  let res=await getDifferentMesCount(id)
  ctx.body={
    status:1,
    mesCount:res
  }
}
async function getMessageList(ctx) {
  const { type } = ctx.request.body;
  const { id } = ctx.state.user
  let res = await getMesListByType({ id, type });
  res = res.map((value, index) =>
    Object.assign({}, value.dataValues, { index: index })
  );
  ctx.body = {
    status: 1,
    detail: "获取消息成功",
    list: res
  };
}
async function deleteMessage(ctx){
  const {id}=ctx.request.body
  await deleteMes(id)
  ctx.body={
    status:1,
    detail:'删除成功'
  }
}
async function changeMesState(ctx) {
  const { id } = ctx.request.body;
  await setMesRead(id);
  ctx.body = {
    status: 1,
    detail: "消息已阅读"
  };
}
module.exports = [
  {
    method: "post",
    handler: getMessage,
    path: "/getMessage"
  },
  {
    method: "post",
    handler: getMessageList,
    path: "/getMessageList"
  },
  {
    method: "post",
    handler: changeMesState,
    path: "/changeMesState"
  },{
    method: "post",
    handler: deleteMessage,
    path: "/deleteMes"
  },
  {
    method: "post",
    handler: getMesCount,
    path: "/getMesCount"
  }
];
