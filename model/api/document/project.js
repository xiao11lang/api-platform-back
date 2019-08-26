const { STRING, INTEGER } = require('sequelize')
const BaseModel = require('../../base')
const activity = require('../apiActivity')
const project = require('../apiProject')
const name = 'project_document'
const model = {
  group_id: {
    type: INTEGER,
    defaultValue: 0
  },
  project_id: {
    type: INTEGER
  },
  name: {
    type: STRING
  },
  updator: {
    type: STRING
  },
  detail: {
    type: STRING
  }
}
class ProjectDocument extends BaseModel {
  constructor() {
    super(name, model)
    this.model.afterCreate(async group => {
      const { project_id, updator, name } = group.dataValues
      activity.insert({
        project_id: project_id,
        activity_type: 'add',
        to_object: 'project_c',
        operator: updator,
        description: `${updator}新建了项目文档（${name}）`
      })
      project.update(project_id, {
        random: Math.random().toString()
      })
    })
    this.model.afterUpdate(async group => {
      const { project_id, updator, name } = group.dataValues
      activity.insert({
        project_id: project_id,
        activity_type: 'modify',
        to_object: 'project_m',
        operator: updator,
        description: `${updator}修改了项目文档(${name})`
      })
      project.update(project_id, {
        random: Math.random().toString()
      })
    })
  }
  findByGroupId(id) {
    return this.model.findAll({
      where: {
        group_id: id
      }
    })
  }
  findByProjectId(id) {
    return this.model.findAll({
      where: {
        project_id: id
      }
    })
  }
  destroyByGroupId(id) {
    return this.model.destroy({
      where: {
        group_id: id
      }
    })
  }
}
module.exports = new ProjectDocument()
