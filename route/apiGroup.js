const group = require('../model/api/apiGroup')
const activity = require('../model/api/apiActivity')
const project=require('../model/api/apiProject')
const user=require('../model/user')
async function addTopGroup(ctx) {
  const { name, project_id } = ctx.request.body
  const id = ctx.state.user.id
  const res = await group.insert({
    name,
    project_id,
    operator_id: id
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
  const { id, name } = ctx.request.body
  const userId = ctx.state.user.id
  await group.update(id, { name: name, operator_id: userId })
  ctx.body = {
    detail: '修改成功',
    status: 1
  }
}
async function deleteGroup(ctx) {
  const { id,projectId } = ctx.request.body
  const userId = ctx.state.user.id
  let res=await group.findById(id)
  await group.destroy(id)
  let from = await user.findById(userId)
  activity.insert({
    project_id: projectId,
    activity_type: 'delete',
    to_object: 'group',
    operator: from[0].dataValues.name,
    description: `${
      from[0].dataValues.name
    }删除了分组(${res[0].dataValues.name})`
  })
  project.update(id, {
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
    path: '/addTopGroup',
    method: 'post'
  },
  {
    handler: getGroups,
    path: '/getGroups',
    method: 'post'
  },
  {
    handler: modifyGroup,
    path: '/modifyGroup',
    method: 'post'
  },
  {
    handler: deleteGroup,
    path: '/deleteGroup',
    method: 'post'
  }
]
