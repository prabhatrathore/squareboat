import { Sequelize, DataTypes } from "sequelize";
import dbconnection from "../config/dbconfig.js";
import mongoose from "mongoose";


const orderModel = dbconnection.define(
    "order", {

    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    order_id: { type: DataTypes.STRING, allowNull: false },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
    amount: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.STRING, allowNull: false },
    products: { type: DataTypes.JSON, allowNull: true },

    updated_at: { type: DataTypes.NOW, defaultValue: DataTypes.NOW },
    created_at: { type: DataTypes.NOW, defaultValue: DataTypes.NOW },
}, { timestamps: false, tableName: "ordermodel" }
)
export default orderModel

export const orderMongooseModel = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        order_id: { type: mongoose.Schema.Types.ObjectId },
        order_date: { type: mongoose.Schema.Types.ObjectId },
        amount: { type: String, require: true },
        useer_id: { type: mongoose.Schema.Types.ObjectId },
        products: { types: mongoose.Schema.Types.Mixed }
    }, {
    timestamps: true
}
)