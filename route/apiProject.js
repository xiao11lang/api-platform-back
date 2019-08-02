const project = require('../model/api/apiProject')
const activity=require('../model/api/apiActivity')
async function addProject(ctx) {
  const { name, type, version, teamId } = ctx.request.body
  let res = await project.insert({
    name: name,
    version: version,
    project_type: type,
    team_id: teamId
  })
  ctx.body = {
    status: 1,
    detail: '新建项目成功',
    item: res.dataValues
  }
}
async function getProjects(ctx) {
  const { teamId } = ctx.request.body
  let res = await project.findByTeamId(teamId)
  ctx.body = {
    detail: '获取项目成功',
    status: 1,
    list: res
  }
}
async function getProjectById(ctx) {
  const { id } = ctx.request.body
  if (id) {
    let res = await project.findById(id)
    let activities= await activity.findByProjectId(id)
    ctx.body = {
      detail: '获取项目成功',
      status: 1,
      list: res,
      activities:activities
    }
  } else {
    ctx.status = 500
    ctx.body = {
      detail: '项目id缺失，请退出后重新登录'
    }
  }
}
async function deleteProject(ctx) {
  const { projectId } = ctx.request.body
  await project.destroy(projectId)
  ctx.body = {
    detail: '删除成功',
    status: 1
  }
}
async function modifyProject(ctx) {
  const { projectId, value } = ctx.request.body
  await project.update(projectId, { ...value })
  ctx.body = {
    detail: '修改成功',
    status: 1
  }
}
async function getActivities(ctx) {
    const { projectId } = ctx.request.body
    let res = await activity.findByProjectId(projectId)
    ctx.body = {
      detail: '获取项目成功',
      status: 1,
      list: res
    }
  }
module.exports = [
  {
    path: '/addProject',
    handler: addProject,
    method: 'post'
  },
  {
    path: '/getProjects',
    handler: getProjects,
    method: 'post'
  },
  {
    path: '/getProject',
    handler: getProjectById,
    method: 'post'
  },
  {
    path: '/deleteProject',
    handler: deleteProject,
    method: 'post'
  },
  {
    path: '/modifyProject',
    handler: modifyProject,
    method: 'post'
  },
  {
    path: '/getActivities',
    handler: getActivities,
    method: 'post'
  }
]
