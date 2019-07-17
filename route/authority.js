const { getByTeamId } = require("../model/authority");
const user = require("../model/user");
async function getAuthorities(ctx) {
  const { teamId } = ctx.request.body;
  let res = await getByTeamId(teamId);
  let userArr = res.map(item => {
    return item.dataValues.user_id;
  });
  let userInfo = await user.findByIdArr(userArr);
  res = res
    .map(item => {
      let curUser = userInfo.filter(user => {
        return user.dataValues.id == item.user_id;
      });
      return Object.assign({}, item.dataValues, {
        name: curUser[0].dataValues.name,
        sex: curUser[0].dataValues.sex
      });
    })
  ctx.body = {
    status: 1,
    detail: "查询成功",
    list: res
  };
}
module.exports = [
  {
    path: "/getAuthorities",
    handler: getAuthorities,
    method: "post"
  }
];
