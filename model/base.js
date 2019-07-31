const sequelize = require('./instance')
class BaseModel {
  constructor(name, model) {
    this.model = sequelize.define(name, model)
  }
  insert(data) {
    return this.model.sync().then(() => {
      return this.model.create(data)
    })
  }
  update(id, values) {
    return this.model.update(values, {
      where: {
        id: id
      }
    })
  }
  destroy(id) {
    return this.model.destroy({
      where: {
        id: id
      }
    })
  }
}
module.exports=BaseModel
