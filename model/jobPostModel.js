import { Sequelize, DataTypes } from "sequelize";
import dbconnection from "../config/dbconfig.js";
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

