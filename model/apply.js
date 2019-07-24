const { INTEGER } = require('sequelize')
const sequelize = require('./instance')
const message = require('./message')
const user = require('./user')
const Apply = sequelize.define('apply', {
  from_id: {
    type: INTEGER
  },
  team_id: {
    type: INTEGER
  },
  master_id: {
    type: INTEGER
  }
})
Apply.afterCreate(async apply => {
  const { master_id, from_id } = apply.dataValues
  let from = await user.findById(from_id)
  message.insert({
    title: '加入工作组申请',
    content: `${from[0].dataValues.name}申请加入您的工作组`,
    type: 'person',
    toWho: master_id
  })
})
function insert(data) {
  return Apply.sync().then(() => {
    return Apply.create(data)
  })
}
function update(id, values) {
  return Apply.update(values, {
    where: {
      id: id
    }
  })
}
function getById(id) {
  return sequelize
    .query(
      `select U.name,U.sex,A.* from users U, applies A where A.from_id=U.id and A.master_id=${id}`
    )
    .then(res => {
      if (res.length) {
        let result = []
        res.forEach(item => {
          result = result.concat(item)
        })
        return [...new Set(result)]
      } else {
        return []
      }
    })
} //根据用户id查询申请
function getByTeamId(id) {
  return Apply.findAll({
    where: {
      team_id: id
    }
  })
}
function destroy(id) {
  return Apply.destroy({
    where: {
      id: id
    }
  })
}
function checkApplyExist(rules) {
  return Apply.findAll({
    where: {
      team_id: rules.teamId,
      from_id: rules.fromId
    }
  })
}
module.exports = {
  insert,
  update,
  destroy,
  getById,
  getByTeamId,
  checkApplyExist
}
