const {
  insert,
  destroy,
  getByTeamId,
  checkApplyExist
} = require("../model/apply");
const { findById } = require("../model/workTeam");
const authority = require("../model/authority");
const user = require("../model/user");
async function addApply(ctx) {
  const { id } = ctx.state.user;
  const { teamId, masterId } = ctx.request.body;
  let res = await checkApplyExist({
    fromId: id,
    teamId: teamId
  });
  if (res.length) {
    ctx.status = 500;
    ctx.body = {
      detail: "您已经提交申请"
    };
  } else {
    await insert({
      from_id: id,
      team_id: teamId,
      master_id: masterId
    });
    ctx.body = {
      status: 1,
      detail: "申请成功"
    };
  }
}
async function getApply(ctx) {
  let id = ctx.state.user.id;
  let res = await getByTeamId(25);
  let userArr = res.map(item => {
    return item.dataValues.from_id;
  });
  let userInfo = await user.findByIdArr(userArr);
  res = res
    .map(item => {
      let curUser = userInfo.filter(user => {
        return user.dataValues.id == item.from_id;
      });
      return Object.assign({}, item.dataValues, {
        name: curUser[0].dataValues.name,
        sex: curUser[0].dataValues.sex
      });
    })
    .filter(apply => apply.master_id === id);
  ctx.body = {
    status: 1,
    detail: "查询成功",
    list: res
  };
}
async function agreeApply(ctx) {
  const { teamId, fromId, applyId } = ctx.request.body;
  const id = ctx.state.user.id;
  let res = await findById(teamId);
  await authority.insert({
    user_id: fromId,
    team_id: teamId,
    userRole: res[0].dataValues.userRole
  });
  await destroy(applyId);
  ctx.body = {
    status: 1,
    detail: "操作成功"
  };
}
module.exports = [
  {
    path: "/addApply",
    handler: addApply,
    method: "post"
  },
  {
    path: "/getApply",
    handler: getApply,
    method: "get"
  },
  {
    path: "/agreeApply",
    handler: agreeApply,
    method: "post"
  }
];
