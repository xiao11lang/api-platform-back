const { STRING, INTEGER } = require('sequelize')
const BaseModel = require('../base')
const activity = require('../api/apiActivity')
const project = require('../api/apiProject')
const JSONOBJECT = require('sequelize').JSON
const name = 'test_instance'
const model = {
  group_id: {
    type: INTEGER,
    defaultValue:0
  },
  project_id: {
    type: INTEGER
  },
  protocol: {
    type: STRING,
    defaultValue: 'http'
  },
  status: {
    type: STRING,
    defaultValue: 'enabled'
  },
  method: {
    type: STRING,
    defaultValue: 'get'
  },
  url: {
    type: STRING
  },
  name: {
    type: STRING
  },
  request: {
    type: JSONOBJECT
  },
  description: {
    type: STRING
  },
  updator:{
      type:STRING
  }
}
class TestInstance extends BaseModel {
  constructor() {
    super(name, model)
    this.model.afterCreate(async group => {
      const { project_id, updator, name } = group.dataValues
      activity.insert({
        project_id: project_id,
        activity_type: 'add',
        to_object: 'status_c',
        operator: updator,
        description: `${updator}新建了状态码（${name}）`
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
        to_object: 'status_c',
        operator: updator,
        description: `${updator}修改了状态码(${name})`
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
module.exports = new TestInstance()
