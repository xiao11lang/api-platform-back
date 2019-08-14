const { STRING, INTEGER } = require('sequelize')
const JSONOBJECT = require('sequelize').JSON
const BaseModel = require('../base')
const name = 'api_instance'
const model = {
  group_id: {
    type: INTEGER
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
  response: {
    type: JSONOBJECT
  },
  result: {
    type: JSONOBJECT
  },
  description: {
    type: STRING
  },
  updator: {
    type: STRING
  }
}
class ApiInstance extends BaseModel {
  constructor() {
    super(name, model)
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
module.exports = new ApiInstance()
