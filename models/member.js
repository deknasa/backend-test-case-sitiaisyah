'use strict';
const { Model } = require('sequelize');
const {hashedPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.BookLoanData, {
        as: "book_loan_data",
        foreignKey: "member_id"
      })
      
    }
  }
  Member.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "name is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use. Try another one!'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Email must be valid"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 10],
          msg: "The password length should be between 6 and 10 characters.",
        },
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
      }
    },
    penaltyStatus: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "penalty status is required"
        },
      }
    },
    penaltyLimit: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Member',
    hooks: { 
      beforeCreate: (member, opt) => {
        const hashPassword = hashedPassword(member.password);
        member.password = hashPassword
        const member_penalty_status = "off";
        member.penaltyStatus = member_penalty_status
        const member_penalty_limit = "0000-00-00"
        member.penaltyLimit = member_penalty_limit
      }
    }
  });
  return Member;
};