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
  findById(id) {
    return this.model.findAll({
      where: {
        id: id
      }
    })
  }
  update(id, values) {
    return this.model.update(values, {
      where: {
        id: id
      },
      individualHooks: true
    })
  }
  destroy(id) {
    return this.model.destroy({
      where: {
        id: id
      },
      individualHooks: true
    })
  }
}
module.exports = BaseModel
