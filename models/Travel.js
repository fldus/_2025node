const {DataTypes} = require('sequelize');
const sequelize = require('./index');

const travel = sequelize.define('Travel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  tableName: 'travellist',
  timestamps: false  // createAt, updateAt 컬럼 사용 안함
});

module.exports = travel;