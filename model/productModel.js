import { Sequelize, DataTypes } from "sequelize";
import dbconnection from "../config/dbconfig.js";
import UserModel from "./userModel.js";
import mongoose from "mongoose";

const productModel = dbconnection.define(
  "product", {

  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
  user_id: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: true },
  quantity: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },

  updated_at: { type: DataTypes.NOW, defaultValue: DataTypes.NOW },
  created_at: { type: DataTypes.NOW, defaultValue: DataTypes.NOW },
}, { timestamps: false, tableName: "product" }
)
export default productModel
// productModel.belongsTo(UserModel,{foreignKey:"id"})

export const productMongooseModel = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    user_id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    quantity: { type: String },
    description: { type: String }
  }, {
  timestamps: true
}
)
/**
 CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(400) NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);

 */