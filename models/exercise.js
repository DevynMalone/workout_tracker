'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Exercise.belongsTo(models.User,{foreignKey:'userId'})
      models.Exercise.belongsTo(models.Workout,{foreignKey:'workoutId'})
    }
  };
  Exercise.init({
    name: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    bodyGroup: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};