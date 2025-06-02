import { Sequelize, DataTypes } from "sequelize";
import dbconnection from "../config/dbconfig.js";


const UserModel = dbconnection.define(
    "user", {

    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    user_type: { type: DataTypes.STRING, defaultValue: 'candidate' },
    access_token: { type: DataTypes.STRING, allowNull:true },

    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
}, { timestamps: false, tableName: "user" }
)
export default UserModel

