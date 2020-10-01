module.exports = (sequelize, DataTypes) => {
  return sequelize.define('question', {
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    excluded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}