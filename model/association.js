import cartModel from "./cartModel.js";
import jobPostModel from "./jobPostModel.js";
import orderModel from "./orderModel.js";
import productModel from "./productModel.js";
import UserModel from "./userModel.js";

//productmodel
UserModel.hasMany(productModel, { foreignKey: "user_id" })
productModel.belongsTo(UserModel, { foreignKey: "user_id" })

//cartmodel
UserModel.hasMany(cartModel, { foreignKey: "user_id" })
cartModel.belongsTo(UserModel, { foreignKey: "user_id" })
cartModel.belongsTo(productModel, { foreignKey: 'product_id' })

//ordermodel 
UserModel.hasMany(orderModel, { foreignKey: "user_id" })
orderModel.belongsTo(UserModel, { foreignKey: 'user_id' })

export { UserModel, productModel, cartModel, orderModel }