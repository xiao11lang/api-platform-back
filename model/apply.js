const { STRING, INTEGER } = require("sequelize");
const sequelize = require("./instance");
const Apply = sequelize.define("apply", {
  from_id: {
    type: INTEGER
  },
  team_id: {
    type: INTEGER
  },
  master_id: {
    type: INTEGER
  }
});
function insert(data) {
  return Apply.sync().then(() => {
    return Apply.create(data);
  });
}
function update(id, values) {
  return Apply.update(values, {
    where: {
      id: id
    }
  });
}
function getById(id) {
  return sequelize
    .query(
      `select U.name,U.sex,A.* from users U, applies A where A.from_id=U.id and A.master_id=${id}`
    )
    .then(res => {
      if (res.length) {
        let result = [];
        res.forEach(item => {
          result = result.concat(item);
        });
        return [...new Set(result)];
      } else {
        return [];
      }
    });
}
function destroy(id) {
  return Apply.destroy({
    where: {
      id: id
    }
  });
}
module.exports = {
  insert,
  update,
  destroy,
  getById
};
