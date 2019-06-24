const Koa = require("koa");
const koaBody = require("koa-body");
const router = require("./route/route");
const cors = require("koa2-cors");
const jwtKoa = require("koa-jwt");
const app = new Koa();
app.use(cors());
app.use(jwtKoa({ secret: "api_master" ,passthrough:true}));
app.use((ctx,next)=>{
  const path=ctx.path.split('/')[1]
  const user=ctx.state.user
  if(ctx.method=='OPTIONS'){
    return next()
  }
  if(path==='login'||path==='register'||(user&&user.id)){
    return next()
  }else{
    ctx.status=401
    ctx.body={
      detail:'未认证'
    }
  }
})
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: "D:/nginx-1.12.2/html/img",
      keepExtensions: true
    }
  })
);
app.use(router.routes()).use(router.allowedMethods());
app.listen(4396);
