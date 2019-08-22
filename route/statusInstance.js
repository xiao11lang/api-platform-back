const instance = require('../model/status/statusInstance')
const activity = require('../model/api/apiActivity')
const project = require('../model/api/apiProject')
async function addStatusInstance(ctx) {
  const { name, projectId, groupId,code } = ctx.request.body
  await instance.insert({
    name,
    project_id: projectId,
    group_id: groupId,
    updator: ctx.username,
    code
  })
  ctx.body = {
    detail: '新建成功',
    status: 1
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
  const { id, projectId, operator } = ctx.request.body
  let res = await instance.findById(id)
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
  const { id, data } = ctx.request.body
  const { meta, description, request, response, updator, result } = data
  meta.group_id = meta.group
  await instance.update(id, {
    ...meta,
    description,
    request,
    response,
    group_id: meta.group,
    updator,
    result
  })
  ctx.body = {
    detail: '保存成功',
    status: 1
  }
}

module.exports = [
  {
    handler: addStatusInstance,
    path: '/status/instance',
    method: 'post'
  },
  {
    handler: getStatusInstances,
    path: '/status/instance',
    method: 'get'
  },
  {
    handler: getStatusInfo,
    path: '/getStatusInfo',
    method: 'post'
  },
  {
    handler: deleteStatus,
    path: '/deleteStatus',
    method: 'post'
  },
  {
    handler: updateStatus,
    path: '/updateStatus',
    method: 'post'
  }
]
