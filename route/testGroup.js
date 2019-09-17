const group = require('../model/test/testGroup')
const activity = require('../model/test/testActivity')
const project = require('../model/test/testProject')
async function addTopGroup(ctx) {
  const { name, project_id } = ctx.request.body
  const operator = ctx.username
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
  const { id } = ctx.query
  let res = await group.findByProjectId(id)
  ctx.body = {
    detail: '获取分组成功',
    status: 1,
    list: res
  }
}
async function modifyGroup(ctx) {
  const { id, name } = ctx.request.body
  const operator = ctx.state.user.name
  await group.update(id, { name: name, operator: operator })
  ctx.body = {
    detail: '修改成功',
    status: 1
  }
}
async function deleteGroup(ctx) {
  const { id, projectId } = ctx.request.body
  let res = await group.findById(id)
  await group.destroy(id)
  const operator = ctx.username
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
    path: '/test/group',
    method: 'post'
  },
  {
    handler: getGroups,
    path: '/test/groups',
    method: 'get'
  },
  {
    handler: modifyGroup,
    path: '/test/modifyGroup',
    method: 'post'
  },
  {
    handler: deleteGroup,
    path: '/test/deleteGroup',
    method: 'post'
  }
]
