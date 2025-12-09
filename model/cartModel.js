import { Sequelize, DataTypes } from "sequelize";
import dbconnection from "../config/dbconfig.js";
import UserModel from "./userModel.js";
import mongoose from "mongoose";

const cartModel = dbconnection.define(
    "cart", {

    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    user_id: { type: DataTypes.STRING, allowNull: false },
    product_id: { type: DataTypes.STRING, allowNull: true },
    quantity: { type: DataTypes.STRING, allowNull: true },

    updated_at: { type: DataTypes.NOW, defaultValue: DataTypes.NOW },
    created_at: { type: DataTypes.NOW, defaultValue: DataTypes.NOW },
}, { timestamps: false, tableName: "cart" }
)
export default cartModel

export const cartMongoModel = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        user_id: { type: mongoose.Schema.Types.ObjectId },
        product_id: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: mongoose.Schema.Types.ObjectId }

    }, {
    timestamps: true
}
)
