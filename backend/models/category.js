module.exports = (sequelize, DataTypes) => {
  return sequelize.define('category', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    excluded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  })
}