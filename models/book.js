'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.BookLoanData, {
        as: "book_loan_data",
        foreignKey: "book_id"
      })
    } 
  }
  Book.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "code already exist"
      },
      notEmpty: {
        args: true,
        msg: "code is required"
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "title is required"
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "author is required"
        },
      } 
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "stock is required"
        },
        isInt: {
          args: true,
          msg: "stock must be integer"
        },
        isNumeric: {
          args: true,
          msg: "stock must be integer"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};