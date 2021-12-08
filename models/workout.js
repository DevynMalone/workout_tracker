'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Workout.belongsTo(models.User,{foreignKey:'userId'})
       //this goes inside of workout model 
       models.Workout.hasMany(models.Exercise,{foreignKey:'workoutId'})
    }
  };
  Workout.init({
    day: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Workout',
  });
  return Workout;
};