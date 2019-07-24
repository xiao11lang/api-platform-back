const {
  findByUesrId,
  getMesListByType,
  setMesRead,
  getDifferentMesCount,
  deleteMes,
  setAllMesRead,
  deleteAllMes,
  insert,
  update
} = require('../model/message')
const user = require('../model/user')
const authority = require('../model/authority')
async function getMessage(ctx) {
  const { id } = ctx.state.user
  let mes = await findByUesrId(id)
  mes = mes.map(value => value.dataValues)
  let res = {
    official: {
      unRead: 0,
      list: []
    },
    project: {
      unRead: 0,
      list: []
    },
    person: {
      unRead: 0,
      list: []
    }
  }
  mes.forEach(item => {
    if (!item.hasRead) {
      res[item.type].unRead++
    }
    switch (item.type) {
      case 'official':
        res.official.list.push(item)
        break
      case 'project':
        res.project.list.push(item)
        break
      case 'person':
        res.person.list.push(item)
        break
    }
  })
  ctx.body = {
    status: 1,
    detail: '获取消息成功',
    list: res
  }
}
async function getMesCount(ctx) {
  //const {id}=ctx.request.body
  const { id } = ctx.state.user
  let res = await getDifferentMesCount(id)
  ctx.body = {
    status: 1,
    mesCount: res
  }
}
async function getMessageList(ctx) {
  const { type } = ctx.request.body
  const { id } = ctx.state.user
  let res = await getMesListByType({ id, type })
  res = res.map((value, index) =>
    Object.assign({}, value.dataValues, { index: index })
  )
  ctx.body = {
    status: 1,
    detail: '获取消息成功',
    list: res
  }
}
async function deleteMessage(ctx) {
  const { id } = ctx.request.body
  await deleteMes(id)
  ctx.body = {
    status: 1,
    detail: '删除成功'
  }
}
async function changeMesState(ctx) {
  const { id } = ctx.request.body
  await setMesRead(id)
  ctx.body = {
    status: 1,
    detail: '消息已阅读'
  }
}
async function setAllMessageRead(ctx) {
  const { type } = ctx.request.body
  const { id } = ctx.state.user
  let res = await setAllMesRead({ toWho: id, type: type })
  ctx.body = {
    status: 1,
    detail: '操作成功',
    affectedCount: res[0]
  }
}
async function deleteAllMessage(ctx) {
  const { type } = ctx.request.body
  const { id } = ctx.state.user
  let res = await deleteAllMes({ toWho: id, type: type })
  ctx.body = {
    status: 1,
    detail: '操作成功',
    affectedCount: res[0]
  }
}
async function inviteMessage(ctx) {
  const { name, teamName, fromName, fromId, teamId } = ctx.request.body
  let userRes = await user.findByName(name)
  if (userRes.length) {
    await insert({
      type: 'official',
      title: '加入工作组邀请',
      content: `尊敬的${name}您好，${fromName}邀请您加入他的工作组${teamName}`,
      toWho: userRes[0].dataValues.id,
      extra: 'invite',
      extraInfo: JSON.stringify({
        masterId: fromId,
        userId: userRes[0].dataValues.id,
        teamId: teamId
      })
    })
    ctx.body = {
      status: 1,
      detail: '邀请成功'
    }
  } else {
    ctx.status = 500
    ctx.body = {
      detail: '该用户不存在'
    }
  }
}
async function agreeInvite(ctx) {
  const { id, extraInfo,name } = ctx.request.body
  const userId = ctx.state.user.id
  await update(id, {
    extraStatus: 'agree'
  })
  const parseInfo = JSON.parse(extraInfo)
  const { teamId, masterId } = parseInfo
  let auth = await authority.checkAuthorityExist({
    userId: userId,
    teamId: teamId
  })
  if (auth.length) {
    ctx.body = {
      detail: '你已经在该工作组中'
    }
  } else {
    await insert({
      title: '加入工作组确认',
      content: `您好，${name}已经同意加入您的工作组，请知悉`,
      toWho: masterId,
      type:'person'
    })
    await authority.insert({
      user_id: userId,
      master_id: masterId,
      team_id: teamId,
      userRole: 'admin'
    })
    ctx.body = {
      detail: '已经同意',
      status: 1
    }
  }
}
async function refuseInvite(ctx) {
  const id = ctx.request.body.id
  await update(id, {
    extraStatus: 'refuse'
  })
  ctx.body = {
    status: 1,
    detail: '已经拒绝'
  }
}
module.exports = [
  {
    method: 'post',
    handler: getMessage,
    path: '/getMessage'
  },
  {
    method: 'post',
    handler: getMessageList,
    path: '/getMessageList'
  },
  {
    method: 'post',
    handler: changeMesState,
    path: '/changeMesState'
  },
  {
    method: 'post',
    handler: setAllMessageRead,
    path: '/setAllMes'
  },
  {
    method: 'post',
    handler: deleteMessage,
    path: '/deleteMes'
  },
  {
    method: 'post',
    handler: deleteAllMessage,
    path: '/deleteAllMes'
  },
  {
    method: 'post',
    handler: getMesCount,
    path: '/getMesCount'
  },
  {
    method: 'post',
    handler: inviteMessage,
    path: '/inviteMessage'
  },
  {
    method: 'post',
    handler: agreeInvite,
    path: '/agreeInvite'
  },
  {
    method: 'post',
    handler: refuseInvite,
    path: '/refuseInvite'
  }
]
