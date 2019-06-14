const { STRING, INTEGER } = require("sequelize");
const sequelize = require("./instance");
const Message = sequelize.define("message", {
  type: {
    type: STRING(30)
  },
  title: {
    type: STRING(30)
  },
  content: {
    type: STRING(1000)
  },
  toWho: {
    type: INTEGER
  },
  hasRead: {
    type: INTEGER,
    defaultValue: 0
  }
});
function insert(data) {
  return Message.sync().then(() => {
    return Message.create(data);
  });
}
function findByUesrId(id) {
  return Message.findAll({
    where: {
      toWho: id
    }
  });
}
function getDifferentMesCount(id) {
  return sequelize
    .query(
      `select type,hasRead,count(distinct(type)) count from messages group by type,toWho,hasRead having toWho=${id}`
    )
    .then(res => {
      return res[0]
        .filter(row => {
          return !row.hasRead;
        })
        .reduce((pre, cur) => {
          pre[cur.type] = cur.count;
          return pre;
        }, {});
    })
    .then(res => {
      ["official", "project", "person"].forEach(type => {
        if (!res[type]) {
          res[type] = 0;
        }
      });
      return res;
    });
}
function getMesListByType(rules) {
  return Message.findAll({
    where: {
      type: rules.type,
      toWho: rules.id
    }
  });
}
function setMesRead(id){
    return Message.update({
        hasRead:1
    },{
        where:{
            id:id
        }
    })
}
module.exports = {
  insert,
  findByUesrId,
  getDifferentMesCount,
  getMesListByType,
  setMesRead
};
