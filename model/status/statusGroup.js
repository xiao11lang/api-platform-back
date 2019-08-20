const { STRING, INTEGER } = require('sequelize')
const BaseModel = require('../base')
const activity = require('../api/apiActivity')
const project = require('../api/apiProject')
const name = 'status_group'
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
  operator: {
    type: STRING
  }
}
class StatusGroup extends BaseModel {
  constructor(name, model) {
    super(name, model)
    this.model.afterCreate(async group => {
      const { project_id, name, operator } = group.dataValues
      activity.insert({
        project_id: project_id,
        activity_type: 'add',
        to_object: 'status',
        operator: operator,
        description: `${operator}新建了状态码分组（${name}）`
      })
      project.update(project_id, {
        random: Math.random().toString()
      })
    })
    this.model.afterUpdate(async group => {
      const { project_id, name, operator } = group.dataValues
      const oldName = group._previousDataValues.name
      activity.insert({
        project_id: project_id,
        activity_type: 'modify',
        to_object: 'status',
        operator: operator,
        description: `${
            operator
        }修改了状态码分组(${oldName})的名称,新分组名为(${name})`
      })
      project.update(project_id, {
        random: Math.random().toString()
      })
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
module.exports = new StatusGroup(name, model)
