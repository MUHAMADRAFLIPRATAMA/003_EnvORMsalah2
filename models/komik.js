module.exports = (sequelize, DataTypes) => sequelize.define('Komik', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING },
});
