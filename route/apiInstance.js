const instance = require('../model/api/apiInstance')
async function addApiInstance(ctx) {
  const {
    meta,
    description,
    request,
    response,
    projectId,
    updator,
    result
  } = ctx.request.body
  await instance.insert({
    ...meta,
    description,
    request,
    response,
    project_id: projectId,
    group_id: meta.group,
    updator,
    result
  })
  ctx.body = {
    detail: '新建成功',
    status: 1
  }
}
async function getApiInstances(ctx) {
  const { projectId } = ctx.request.body
  let res = await instance.findByProjectId(projectId)
  ctx.body = {
    detail: '获取api成功',
    status: 1,
    list: res
  }
}
async function getApiInfo(ctx) {
  const { id } = ctx.request.body
  let res = await instance.findById(id)
  ctx.body = {
    detail: '获取api成功',
    status: 1,
    info: res[0]
  }
}
async function deleteApi(ctx) {
  const { id } = ctx.request.body
  await instance.destroy(id)
  ctx.body = {
    detail: '删除成功',
    status: 1
  }
}
async function updateApi(ctx) {
  const {id,data}=ctx.request.body
  const {
    meta,
    description,
    request,
    response,
    updator,
    result
  } = data
  meta.group_id=meta.group
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
    handler: addApiInstance,
    path: '/addApiInstance',
    method: 'post'
  },
  {
    handler: getApiInstances,
    path: '/getApiInstances',
    method: 'post'
  },
  {
    handler: getApiInfo,
    path: '/getApiInfo',
    method: 'post'
  },
  {
    handler: deleteApi,
    path: '/deleteApi',
    method: 'post'
  },
  {
    handler: updateApi,
    path: '/updateApi',
    method: 'post'
  }
]
