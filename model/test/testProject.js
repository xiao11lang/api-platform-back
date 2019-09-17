const { STRING, INTEGER } = require("sequelize");
const BaseModel = require("../base");
const name = "test_project";
const sequelize=require('../instance')
const model = {
  name: {
    type: STRING(30)
  },
  version: {
    type: STRING(20),
    defaultValue: "1.0.0"
  },
  instance_number: {
    type: INTEGER
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
};
class TestProject extends BaseModel {
  constructor(name, model) {
    super(name, model);
  }
  findByTeamId(id) {
    return this.model.findAll({
      where: {
        team_id: id
      }
    });
  }
  findById(id) {
    return sequelize.query(
      `select t.*, (select count(*) from test_instances i where project_id=${id} ) case_number from test_projects t where t.id=${id}`
    ).then((res)=>{
      return res[0]
    });
  }
}
module.exports = new TestProject(name, model);
