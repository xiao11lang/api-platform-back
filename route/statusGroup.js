const group = require('../model/status/statusGroup')
const activity = require('../model/api/apiActivity')
const project = require('../model/api/apiProject')
async function addTopGroup(ctx) {
  const { name, project_id, operator } = ctx.request.body
  const res = await group.insert({
    name,
    project_id,
    operator: operator
  })
  ctx.body = {
    detail: '新建分组成功',
    status: 1,
    item: res
  }
}
async function getGroups(ctx) {
  const { id } = ctx.request.body
  let res = await group.findByProjectId(id)
  ctx.body = {
    detail: '获取分组成功',
    status: 1,
    list: res
  }
}
async function modifyGroup(ctx) {
  const { id, name, operator } = ctx.request.body
  await group.update(id, { name: name, operator: operator })
  ctx.body = {
    detail: '修改成功',
    status: 1
  }
}
async function deleteGroup(ctx) {
  const { id, projectId, operator } = ctx.request.body
  let res = await group.destroy(id)
  activity.insert({
    project_id: projectId,
    activity_type: 'delete',
    to_object: 'status',
    operator: operator,
    description: `${operator}删除了分组(${res[0].dataValues.name})`
  })
  project.update(projectId, {
    random: Math.random().toString()
  })
  ctx.body = {
    detail: '删除成功',
    status: 1
  }
}
module.exports = [
  {
    handler: addTopGroup,
    path: '/status/group',
    method: 'post'
  },
  {
    handler: getGroups,
    path: '/status/groups',
    method: 'get'
  },
  {
    handler: modifyGroup,
    path: '/status/modifyGroup',
    method: 'post'
  },
  {
    handler: deleteGroup,
    path: '/status/group',
    method: 'delete'
  }
]
