const instance = require('../model/test/testInstance')
const activity = require('../model/test/testActivity')
const project = require('../model/test/testProject')
async function addTestInstance(ctx) {
  const { name, projectId, groupId, code } = ctx.request.body
  const res = await instance.insert({
    name,
    project_id: projectId,
    group_id: groupId,
    updator: ctx.username,
    code
  })
  ctx.body = {
    detail: '新建成功',
    status: 1,
    item: res
  }
}
async function getStatusInstances(ctx) {
  const { id } = ctx.query
  let res = await instance.findByProjectId(id)
  ctx.body = {
    detail: '获取api成功',
    status: 1,
    list: res
  }
}
async function getStatusInfo(ctx) {
  const { id } = ctx.request.body
  let res = await instance.findById(id)
  ctx.body = {
    detail: '获取api成功',
    status: 1,
    info: res[0]
  }
}
async function deleteStatus(ctx) {
  const { id, projectId } = ctx.request.body
  let res = await instance.findById(id)
  const operator = ctx.username
  await instance.destroy(id)
  activity.insert({
    project_id: projectId,
    activity_type: 'delete',
    to_object: 'group',
    operator: operator,
    description: `${operator}删除了api(${res[0].dataValues.name})`
  })
  project.update(projectId, {
    random: Math.random().toString()
  })
  ctx.body = {
    detail: '删除成功',
    status: 1
  }
}
async function updateStatus(ctx) {
  const { id, groupId, name, code } = ctx.request.body
  await instance.update(id, {
    group_id: groupId,
    name,
    code
  })
  ctx.body = {
    detail: '修改成功',
    status: 1
  }
}

module.exports = [
  {
    handler: addTestInstance,
    path: '/test/instance',
    method: 'post'
  },
  {
    handler: getStatusInstances,
    path: '/test/instance',
    method: 'get'
  },
  {
    handler: getStatusInfo,
    path: '/getStatusInfo',
    method: 'post'
  },
  {
    handler: deleteStatus,
    path: '/status/delete',
    method: 'post'
  },
  {
    handler: updateStatus,
    path: '/status/update',
    method: 'post'
  }
]
