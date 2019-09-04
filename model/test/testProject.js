const { STRING, INTEGER } = require('sequelize')
const BaseModel = require('../base')
const name = 'test_project'
const model = {
  name: {
    type: STRING(30)
  },
  version: {
    type: STRING(20),
    defaultValue: '1.0.0'
  },
  project_des: {
    type: STRING
  },
  team_id: {
    type: INTEGER
  },
  random: {
    type: STRING
  }
}
class TestProject extends BaseModel {
  constructor(name, model) {
    super(name, model)
  }
  findByTeamId(id) {
    return this.model.findAll({
      where: {
        team_id: id
      }
    })
  }
  findById(id) {
    return this.model.findAll({
      where: {
        id: id
      }
    })
  }
}
module.exports = new TestProject(name, model)
