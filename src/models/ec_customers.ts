import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize-config";
import EcCustomers from "../../types/modelTypes/ec_customers";
import bcrypt from "bcrypt";

EcCustomers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },

    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    e_mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    registration_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: (): string => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // we store the random value as string so that
      }, // since we take take value from 1 lakh to 9 lakh
    }, // and string take less space than int
    registration_time_stamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // giving a default value
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAtAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "ec_customers", // just mentioning the modelName can be anything
    tableName: "ec_customers", // specifying rhe database name
    hooks: {
      beforeCreate: (user: EcCustomers) => {
        // Hash the password using bcrypt before creating the record
        const hashedPassword = bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(10)
        );
        user.password = hashedPassword;
      },
    },
  }
);

export default EcCustomers;
