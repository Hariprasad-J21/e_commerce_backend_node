import { DataTypes, Sequelize } from "sequelize";
import EcSuppliers from "../../types/ec_suppliers";
import sequelize from "../config/sequelize-config";
import bcrypt from "bcrypt";

EcSuppliers.init(
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
    modelName: "ec_suppliers", // just mentioning the modelName can be anything
    tableName: "ec_suppliers", // specifying rhe database name
    hooks: {
      beforeCreate: (user: EcSuppliers) => {
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

export default EcSuppliers;
