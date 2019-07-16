const { STRING, INTEGER } = require("sequelize");
const sequelize = require("./instance");
const WorkTeam = sequelize.define("work_team", {
  name: {
    type: STRING(30)
  },
  master: {
    type: INTEGER
  },
  unique_id: {
    type: STRING(40)
  },
  autoBind: {
    type: INTEGER
  },
  userRole: {
    type: STRING(10)
  },
});
function insert(data) {
  return WorkTeam.sync().then(() => {
    return WorkTeam.create(data);
  });
}
function update(id, values) {
  return WorkTeam.update(values, {
    where: {
      id: id
    }
  });
}
function findByMasterId(id) {
  return WorkTeam.findAll({
    where: {
      master: id
    }
  });
}
function findByUniqueId(id) {
  return WorkTeam.findAll({
    where: {
      unique_id: id
    }
  });
}
function findById(id) {
  return WorkTeam.findAll({
    where: {
      id: id
    }
  });
}
function destroy(id){
  return WorkTeam.destroy({
    where:{
      id:id
    }
  })
}
module.exports = {
  insert,
  update,
  findByMasterId,
  findByUniqueId,
  findById,
  destroy
};
