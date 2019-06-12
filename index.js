const Koa=require('koa')
const koaBody=require('koa-body')
const router=require('./route/route')
const cors=require('koa2-cors')
const app=new Koa()
app.use(koaBody({
  multipart:true,
  formidable:{
      uploadDir:"D:/nginx-1.12.2/html/img",
      keepExtensions:true
  }
}))
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
app.listen(4396)