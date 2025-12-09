import { Sequelize, DataTypes } from "sequelize";
import dbconnection from "../config/dbconfig.js";
import mongoose from "mongoose";
// wwwwwwwwwwwwwwwwwwwwwww

const jobPostModel = dbconnection.define(
    "jobPost", {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    applied_user: { type: DataTypes.JSON, allowNull: true },

    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
}, { timestamps: false, tableName: "jobPost" }
)
export default jobPostModel

export const jobPostModelMongoose = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        user_id: { type: mongoose.Schema.Types.ObjectId },
        title: { type: String },
        description: { type: String },

    }, {
    timestamps: true
}
)