const { insert, update, findByName, findById } = require("../model/user");
const { getDifferentMesCount } = require("../model/message");
const jwt=require('jsonwebtoken')
async function register(ctx) {
  const { name, pass } = ctx.request.body;
  let res = await findByName(name);
  if (res.length) {
    ctx.status = 500;
    ctx.body = {
      detail: "用户名已经被注册"
    };
  } else {
    let res=await insert({
      name: name,
      password: pass
    });
    const {id}=res.dataValues
    const token=jwt.sign({id:id,name:name},'api_master',{expiresIn: '1h'})
    ctx.body = {
      status: 1,
      detail: "注册成功",
      token:token
    };
  }
}
async function login(ctx) {
  const { name, pass } = ctx.request.body;
  let res = await findByName(name);
  if (!res.length) {
    ctx.status = 500;
    ctx.body = {
      detail: "用户名不存在"
    };
  } else {
    const { password, id, sex, avatar } = res[0].dataValues;
    if (password != pass) {
      ctx.status = 500;
      ctx.body = {
        detail: "密码错误"
      };
    } else {
      //let mes = await findByUesrId(id);
      let count =await getDifferentMesCount(id)
      //mes = mes.map(value => value.dataValues);
      const token=jwt.sign({id:id,name:name},'api_master',{expiresIn: '1h'})
      ctx.body = {
        detail: "登录成功",
        status: 1,
        info: {
          name: name,
          id: id,
          sex: sex,
          avatar: avatar
        },
        token:token,
        //mes:mes,
        mesCount:count
      };
    }
  }
}
async function getInfo(ctx){
  const {id}=ctx.state.user
  let res = await findById(id);
  const { sex, avatar,name } = res[0].dataValues;
  ctx.body={
    status:1,
    info: {
      name: name,
      id: id,
      sex: sex,
      avatar: avatar
    }
  }
}
async function updateInfo(ctx) {
  const { id, sex, name } = ctx.request.body;
  await update(id, { sex: sex, name: name });
  ctx.body = {
    status: 1,
    detail: "修改信息成功"
  };
}
async function changePass(ctx) {
  const { id, oldPass, newPass } = ctx.request.body;
  let res = await findById(id);
  const { password } = res[0].dataValues;
  if (oldPass != password) {
    ctx.status = 500;
    ctx.body = {
      detail: "旧密码输入错误"
    };
  } else if (newPass == password) {
    ctx.status = 500;
    ctx.body = {
      detail: "新的密码不可与旧的密码相同"
    };
  } else {
    await update(id, { password: newPass });
    ctx.body = {
      status: 1,
      detail: "修改密码成功"
    };
  }
}
async function uploadAvatar(ctx) {
  const { id } = ctx.request.body;
  let file = ctx.request.files.file;
  let name = "";
  if (file) {
    name = `upload${file.path.split("upload")[1]}`;
  }

  await update(id, { avatar: name });
  ctx.body = {
    status: 1,
    detail: "上传成功",
    url: name
  };
}
module.exports = [
  {
    handler: register,
    path: "/register",
    method: "post"
  },
  {
    handler: login,
    path: "/login",
    method: "post"
  },
  {
    handler: getInfo,
    path: "/getInfo",
    method: "get"
  },
  {
    handler: updateInfo,
    path: "/updateInfo",
    method: "post"
  },
  {
    handler: changePass,
    path: "/changePass",
    method: "post"
  },
  {
    handler: uploadAvatar,
    path: "/uploadAvatar",
    method: "post"
  }
];
