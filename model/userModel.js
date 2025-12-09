import { Sequelize, DataTypes } from "sequelize";
import dbconnection from "../config/dbconfig.js";
import productModel from "./productModel.js";
import cartModel from "./cartModel.js";
import mongoose from "mongoose";


const UserModel = dbconnection.define(
    "user", {

    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    user_type: { type: DataTypes.STRING, defaultValue: 'candidate' },
    access_token: { type: DataTypes.STRING, allowNull: true },

    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
}, { timestamps: false, tableName: "user" }
)
export default UserModel

// here we define schema first then convert this into model
const userMongoModel = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String },
        email: { type: String, require: true, trim: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"] },
        password: { type: String },
        user_type: { type: String },
        access_token: { type: String },
        age: { type: Number },
        address: { type: mongoose.Schema.Types.Mixed  },
        wishlist: { type: mongoose.Schema.Types.Mixed  },
        test_number: { type: mongoose.Schema.Types.Mixed  },
    }, {
    timestamps: true
}
)
//below convert schema into model
export const userMongoModel2 = mongoose.model("user", userMongoModel)