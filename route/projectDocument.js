const document = require('../model/api/document/project')
async function addProjectDocument(ctx) {
  const { name, groupId, projectId, detail } = ctx.request.body
  const updator = ctx.username
  await document.insert({
    name,
    group_id: groupId,
    project_id: projectId,
    detail,
    updator
  })
  ctx.body = {
    detail: '新建成功',
    status: 1
  }
}
async function getProjectDocuments(ctx) {
  const { id } = ctx.query
  let res = await document.findByProjectId(id)
  ctx.body = {
    list: res,
    detail: '获取文档成功',
    status: 1
  }
}
async function updateProjectDocument(ctx) {
  const { id, name, groupId, detail } = ctx.request.body
  const updator = ctx.username
  let res = await document.update(id, {
    name,
    group_id: groupId,
    updator,
    detail
  })
  ctx.body = {
    list: res,
    detail: '修改文档成功',
    status: 1
  }
}
async function deleteProjectDocument(ctx) {
  const { id } = ctx.query
  let res = await document.destroy(id)
  ctx.body = {
    list: res,
    detail: '删除文档成功',
    status: 1
  }
}
module.exports = [
  {
    path: '/project/document',
    handler: addProjectDocument,
    method: 'post'
  },
  {
    path: '/project/document',
    handler: getProjectDocuments,
    method: 'get'
  },
  {
    path: '/project/update',
    handler: updateProjectDocument,
    method: 'post'
  },
  {
    path: '/project/document',
    handler: deleteProjectDocument,
    method: 'delete'
  }
]
