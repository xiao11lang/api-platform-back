const { STRING, INTEGER } = require('sequelize')
const BaseModel = require('../base')
const name = 'api_activity'
const model = {
  project_id: {
    type: INTEGER
  },
  operator: {
    type: STRING(30)
  },
  activity_type: {
    type: STRING(10)
  },
  to_object: {
    type: STRING(10)
  },
  description: {
    type: STRING(100)
  }
}
class APIActivity extends BaseModel {
  constructor(name, model) {
    super(name, model)
  }
  findByProjectId(id) {
    return this.model.findAll({
      where: {
        project_id: id
      }
    })
  }
}
module.exports = new APIActivity(name, model)
