'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookLoanData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Member, {
        as: "Member",
        foreignKey: "member_id"
      })
      this.belongsTo(models.Book, {
        as: "Book",
        foreignKey: "book_id"
      })
    }
  }
  BookLoanData.init({
    member_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    book_code: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BookLoanData',
  });
  return BookLoanData;
};