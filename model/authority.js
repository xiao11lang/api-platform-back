const { STRING, INTEGER } = require("sequelize");
const sequelize = require("./instance");
const Authority = sequelize.define("authority", {
  user_id: {
    type: INTEGER
  },
  team_id: {
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
module.exports = {
  insert,
  update,
  destroy
};
