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
  },
  extra:{
    type:STRING,
    defaultValue:''
  },
  extraStatus:{
    type:STRING,
    defaultValue:''
  },
  extraInfo:{
    type:STRING,
    defaultValue:''
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
      `select type,count(type) count from (select * from messages where toWho=${id} and hasRead=0) mes group by type;`
    )
    .then(res => {
      return res[0].reduce((pre, cur) => {
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
function setMesRead(id) {
  return Message.update(
    {
      hasRead: 1
    },
    {
      where: {
        id: id
      }
    }
  );
}
function setAllMesRead(rules) {
  const {toWho,type}=rules
  return Message.update(
    {
      hasRead: 1
    },
    {
      where: {
        toWho:toWho,
        type:type
      }
    }
  );
}
function deleteMes(id) {
  return Message.destroy(
    {
      where: {
        id: id
      }
    }
  );
}
function deleteAllMes(rules) {
  const {toWho,type}=rules
  return Message.destroy(
    {
      where: {
        toWho:toWho,
        type:type
      }
    }
  );
}
function update(id, values) {
  return Message.update(values, {
    where: {
      id: id
    }
  });
}
module.exports = {
  insert,
  findByUesrId,
  getDifferentMesCount,
  getMesListByType,
  setMesRead,
  deleteMes,
  setAllMesRead,
  deleteAllMes,
  update
};
