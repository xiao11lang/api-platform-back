const { insert, findByMasterId, findByUniqueId } = require("../model/workTeam");
const message = require("../model/message");
const rs = require("randomstring");
async function initWorkTeam(ctx) {
  const { id } = ctx.state.user;
  const data = {
    name: `team_${id + rs.generate(6)}`,
    master: id,
    unique_id: (id + rs.generate(40)).substring(0, 40),
    autoBind: 0,
    userRole: ""
  };
  let res = await insert(data);
  await message.insert({
    type: "official",
    title: "新建工作组成功",
    content: `您好，已经为您创建一个新的工作组，工作组名${
      res.name
    },感谢您的使用。`,
    toWho: id
  });
  ctx.body = {
    status: 1,
    detail: "新建成功",
    info: res
  };
}
async function getWorkTeamInfo(ctx) {
  const { id } = ctx.state.user;
  let res = await findByMasterId(id);
  let all = res.map(team => {
    return team.dataValues;
  });
  ctx.body = {
    status: "1",
    detail: "获取工作组信息成功",
    info: res[0].dataValues,
    all: all
  };
}
async function getWorkTeamList(ctx) {
  const { id } = ctx.state.user;
  const { teamId } = ctx.request.body;
  let res = await findByMasterId(id);
  res = res.map(team => {
    return team.dataValues;
  });
  let curIndex, curTeam;
  res.forEach((team, index) => {
    if (team.id === teamId) {
      curIndex = index;
      curTeam = team;
    }
  });
  if (curTeam) {
    res.splice(curIndex, 1);
    res.unshift(curTeam);
    ctx.body = {
      status: "1",
      detail: "获取工作组信息成功",
      list: res
    };
  } else {
    ctx.body = {
      status: "1",
      detail: "获取工作组信息成功",
      list: []
    };
  }
}
async function getWorkTeamExist(ctx) {
  const { id } = ctx.request.body;
  let res = await findByUniqueId(id);
  if (!res.length) {
    ctx.status = 500;
    ctx.body = {
      detail: "该工作组不存在"
    };
  } else {
    ctx.body = {
      status: 1,
      detail: "查询成功"
    };
  }
}
module.exports = [
  {
    path: "/initWorkTeam",
    handler: initWorkTeam,
    method: "get"
  },
  {
    path: "/getTeamInfo",
    handler: getWorkTeamInfo,
    method: "get"
  },
  {
    path: "/getWorkTeamExist",
    handler: getWorkTeamExist,
    method: "post"
  },
  {
    path: "/getTeamList",
    handler: getWorkTeamList,
    method: "post"
  }
];
