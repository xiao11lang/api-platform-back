const { STRING, INTEGER } = require("sequelize");
const sequelize = require("./instance");
const Authority = sequelize.define("authority", {
  user_id: {
    type: INTEGER
  },
  team_id: {
    type: INTEGER
  },
  master_id: {
    type: INTEGER
  },
  userRole: {
    type: STRING(10)
  }
});
function insert(data) {
  return Authority.sync().then(() => {
    return Authority.create(data);
  });
}
function update(id, values) {
  return Authority.update(values, {
    where: {
      id: id
    }
  });
}
function destroy(id) {
  return Authority.destroy({
    where: {
      id: id
    }
  });
}
function getByTeamId(id) {
  return Authority.findAll({
    where: {
      team_id: id
    }
  });
}
function getByUserId(id) {
  return Authority.findAll({
    where: {
      user_id: id
    }
  });
}
function getByRules(rule) {
  return Authority.findAll({
    where: rule
  });
}
function checkAuthorityExist(rules) {
  return Authority.findAll({
    where: {
      team_id: rules.teamId,
      user_id: rules.userId
    }
  });
}
module.exports = {
  insert,
  update,
  destroy,
  getByTeamId,
  getByUserId,
  checkAuthorityExist,
  getByRules
};
