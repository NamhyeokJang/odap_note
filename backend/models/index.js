
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config()

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* Define Model */
db.Category = require('./category')(sequelize, Sequelize)
db.Question = require('./question')(sequelize, Sequelize)
db.Log = require('./log')(sequelize, Sequelize)

/* Model Associate */
db.Category.hasMany(db.Question, { foreignKey: 'categoryId', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
db.Question.belongsTo(db.Category, { foreignKey: 'categoryId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

db.Question.hasMany(db.Log, { foreignKey: 'questionId', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
db.Log.belongsTo(db.Question, { foreignKey: 'questionId', targetKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

module.exports = db;