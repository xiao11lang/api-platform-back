const { STRING, INTEGER } = require('sequelize')
const BaseModel = require('../base')
const name = 'api_project'
const model = {
  name: {
    type: STRING(30)
  },
  version: {
    type: STRING(20),
    defaultValue: '1.0.0'
  },
  project_type: {
    type: STRING(10),
    defaultValue: 'web'
  },
  team_id: {
    type: INTEGER
  },
  interface_number: {
    type: INTEGER,
    defaultValue: 0
  },
  person_number: {
    type: INTEGER,
    defaultValue: 0
  },
  code_number: {
    type: INTEGER,
    defaultValue: 0
  },
  document_number: {
    type: INTEGER,
    defaultValue: 0
  }
}
class APIProject extends BaseModel {
  constructor(name, model) {
    super(name, model)
  }
  findByTeamId(id){
      return this.model.findAll({
          where:{
              team_id:id
          }
      })
  }
}
module.exports = new APIProject(name, model)
