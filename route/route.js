const fs = require("fs");
const Router = require("koa-router");
const router = new Router();
const files = fs.readdirSync(__dirname);
let routes = [];
files.forEach(file => {
  if (file != "route.js") {
    routes = routes.concat(require(`./${file}`));
  }
});
routes.forEach(route => {
  router[route.method || "get"](route.path, route.handler);
});
module.exports = router;
