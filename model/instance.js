const Sequelize = require('sequelize');
const Op = Sequelize.Op
const sequelize = new Sequelize('api_master', 'root', '19950403', {
  host: 'localhost',
  dialect: 'mysql',
  define:{
      charset:'utf8'
  }
});
module.exports=sequelize