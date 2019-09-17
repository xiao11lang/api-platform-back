const project = require('../model/test/testProject')
const activity = require('../model/api/apiActivity')
async function addProject(ctx) {
  const { name, des, version, teamId } = ctx.request.body
  let res = await project.insert({
    name: name,
    version: version,
    project_des: des,
    team_id: teamId
  })
  ctx.body = {
    status: 1,
    detail: '新建项目成功',
    item: res.dataValues
  }
}
async function getProjects(ctx) {
  const { id } = ctx.request.query
  let res = await project.findByTeamId(id)
  ctx.body = {
    detail: '获取项目成功',
    status: 1,
    list: res
  }
}
async function getProject(ctx) {
  const { id } = ctx.request.query
  let res = await project.findById(id)
  console.log(res);
  ctx.body = {
    detail: '获取项目成功',
    status: 1,
    list: res,
    activities:[]
  }
}
async function getProjectById(ctx) {
  const { id } = ctx.request.body
  if (id) {
    let res = await project.findById(id)
    let activities = await activity.findByProjectId(id)
    ctx.body = {
      detail: '获取项目成功',
      status: 1,
      list: res,
      activities: activities
    }
  } else {
    ctx.status = 500
    ctx.body = {
      detail: '项目id缺失，请退出后重新登录'
    }
  }
}
async function deleteProject(ctx) {
  const { id } = ctx.request.query
  await project.destroy(id)
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
    path: '/test/project',
    handler: addProject,
    method: 'post'
  },
  {
    path: '/test/projects',
    handler: getProjects,
    method: 'get'
  },
  {
    path: '/test/project',
    handler: getProject,
    method: 'get'
  },
  {
    path: '/getProject',
    handler: getProjectById,
    method: 'post'
  },
  {
    path: '/test/project',
    handler: deleteProject,
    method: 'delete'
  },
  {
    path: '/test/project/update',
    handler: modifyProject,
    method: 'post'
  },
  {
    path: '/getActivities',
    handler: getActivities,
    method: 'post'
  }
]
