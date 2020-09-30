const sequelize = require('../models').sequelize

function clean() {
  sequelize.sync({ force: true })
    .then(() => sequelize.close())
}

module.exports = clean