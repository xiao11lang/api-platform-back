const {
  findByUesrId,
  getMesListByType,
  setMesRead
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
async function getMessageList(ctx) {
  const { id, type } = ctx.request.body;
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
  }
];
