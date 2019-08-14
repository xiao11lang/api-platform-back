const { STRING, INTEGER } = require('sequelize')
const BaseModel = require('../base')
const activity = require('./apiActivity')
const project = require('./apiProject')
const user = require('../user')
const instance = require('./apiInstance')
const name = 'api_group'
const model = {
  project_id: {
    type: INTEGER
  },
  parent_id: {
    type: INTEGER
  },
  name: {
    type: STRING(20)
  },
  operator_id: {
    type: INTEGER
  }
}
class APIGroup extends BaseModel {
  constructor(name, model) {
    super(name, model)
    this.model.afterCreate(async group => {
      const { project_id, name, operator_id } = group.dataValues
      let from = await user.findById(operator_id)
      activity.insert({
        project_id: project_id,
        activity_type: 'add',
        to_object: 'group',
        operator: from[0].dataValues.name,
        description: `${from[0].dataValues.name}新建了分组（${name}）`
      })
      project.update(project_id, {
        random: Math.random().toString()
      })
    })
    this.model.afterUpdate(async group => {
      const { project_id, name, operator_id } = group.dataValues
      const oldName = group._previousDataValues.name
      let from = await user.findById(operator_id)
      activity.insert({
        project_id: project_id,
        activity_type: 'modify',
        to_object: 'group',
        operator: from[0].dataValues.name,
        description: `${
          from[0].dataValues.name
        }修改了分组(${oldName})的名称,新分组名为(${name})`
      })
      project.update(project_id, {
        random: Math.random().toString()
      })
    })
    this.model.afterDestroy(group => {
      const { id } = group.dataValues
      instance.destroyByGroupId(id)
    })
  }
  findByProjectId(id) {
    return this.model.findAll({
      where: {
        project_id: id
      }
    })
  }
}
module.exports = new APIGroup(name, model)
