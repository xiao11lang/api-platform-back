const { insert, findByMasterId, findByUniqueId } = require("../model/workTeam");
const rs = require("randomstring");
async function initWorkTeam(ctx) {
  const { id } = ctx.state.user;
  const data = {
    name: `team_${id + rs.generate(6)}`,
    master: id,
    unique_id: (id + rs.generate(40)).substring(0, 40),
    autoBind: 0,
    userRole: "",
  };
  let res=await insert(data);
  ctx.body={
      status:1,
      detail:'新建成功',
      info:res
  }
}
async function getWorkTeamInfo(ctx) {
  const { id } = ctx.state.user;
  let res = await findByMasterId(id);
  let all=res.map((team)=>{
      return team.dataValues
  })
  ctx.body = {
    status: "1",
    detail: "获取工作组信息成功",
    info: res[0].dataValues,
    all:all
  };
}
async function getWorkTeamList(ctx) {
    const { id } = ctx.state.user;
    let res = await findByMasterId(id);
    res=res.map((team)=>{
        return team.dataValues
    })
    ctx.body = {
      status: "1",
      detail: "获取工作组信息成功",
      list:res
    };
  }
async function getWorkTeamExist(ctx) {
    const { id } = ctx.request.body
    let res = await findByUniqueId(id);
    if(!res.length){
        ctx.status=500
        ctx.body={
            detail:'该工作组不存在'
        }
    }else{
        ctx.body={
            status:1,
            detail:'查询成功'
        }
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
    method: "get"
  }
];
