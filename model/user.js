const { STRING, INTEGER } = require("sequelize");
const sequelize = require("./instance");
const message = require("./message");
const wt = require("./workTeam");
const rs = require("randomstring");
const User = sequelize.define("user", {
  name: {
    type: STRING(30)
  },
  password: {
    type: STRING(30)
  },
  sex: {
    type: STRING(10),
    defaultValue: "male"
  },
  avatar: {
    type: STRING(100),
    defaultValue:'http://images.china.cn/attachement/jpg/site1000/20140322/0019b91ec90f149786f62a.jpg'
  },
  workTeamId: {
    type: INTEGER,
    defaultValue: 0
  }
});
User.afterCreate(async user => {
  const id = user.dataValues.id;
  message.insert({
    type: "official",
    title: "欢迎进入API Master",
    content: `尊敬的${
      user.dataValues.name
    }您好，欢迎进入API Master。如果您有任何使用上的问题，请联系我们的客服人员，感谢您的使用。`,
    toWho: id
  });
  let teamInfo = await wt.insert({
    name: `team_${id + rs.generate(6)}`,
    master: id,
    unique_id: (id + rs.generate(40)).substring(0, 40),
    autoBind: 0,
    userRole: ""
  });
  message.insert({
    type: "official",
    title: "创建工作组成功",
    content: `尊敬的${user.dataValues.name}您好，已经为您新建一个工作组（${
      teamInfo.dataValues.name
    }），人员加入工作空间之后，您需要为其分配产品以及设置访问权限，否则该人员将无法看到工作空间内的任何项目信息。`,
    toWho: id
  });
  User.update(
    { workTeamId: teamInfo.id },
    {
      where: {
        id: id
      }
    }
  );
});
function findByName(name) {
  return User.findAll({
    where: {
      name: name
    }
  });
}
function findById(id) {
  return User.findAll({
    where: {
      id: id
    }
  });
}
function insert(data) {
  return User.sync().then(() => {
    return User.create(data);
  });
}
function update(id, values) {
  return User.update(values, {
    where: {
      id: id
    }
  });
}
module.exports = {
  insert,
  update,
  findByName,
  findById
};
