module.exports = (sequelize, DataTypes) => {
  return sequelize.define('log', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
}