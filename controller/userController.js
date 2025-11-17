import Joi from 'joi'
import bcrypt from 'bcrypt'
let salt = 10
import jwt from 'jsonwebtoken'
export const userSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().labell('email'),
    name: Joi.string().min(3).required().label("name"),
    password:Joi.string().min(3).max(50).required().label("password")
})
// import Joi from "joi";
// import UserModel from "../model/userModel.js"
// import bcrypt from 'bcrypt'
// let salt = 10
// import jwt from 'jsonwebtoken'

// export const USerSchema = Joi.object({
//     email: Joi.string()
//         .trim()
//         .required()
//         .email({ tlds: { allow: false } })
//         .label('Email'),
//     name: Joi.string().
//         min(3).max(20)
//         .trim()
//         .required()
//         .label('name'),
//     password: Joi.string()
//         .trim().
//         min(3).max(20)
//         .required()
//         .label('password')
// });


// const options = {
//     abortEarly: false,
//     allowUnknown: true,
//     stripUnknown: true,
// };


// export const register = async (req, res) => {
//     try {
//         console.log("first", req.body)
//         let { error } = USerSchema.validate(req.body, options)

//         if (error) {
//             return res.status(400).json({ message: error.details[0]?.message, statusCode: 400 })
//         }
//         let { name, email, password, user_type } = req.body

//         // joi validation

//         // check email is exist in db or not
//         let emailcheck = await UserModel.findOne({ where: { email }, attributes: ['email'], raw: true })
//         if (emailcheck) {
//             return res.status(400).json({ message: `This email is already registered`, statusCode: 400, success: false })
//         }

//         let encrypt = await bcrypt.hash(password, salt);
//         let obj = {
//             name,
//             email,
//             password: encrypt,
//             updated_at: Date.now(),
//             created_at: Date.now(),
//             user_type: user_type,
//         }

//         await UserModel.create(obj)

//         return res.status(200).json({ mesage: "Successs" })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
//     }
// }

// export const USerLoginSchema = Joi.object({
//     email: Joi.string()
//         .trim()
//         .required()
//         .email({ tlds: { allow: false } })
//         .label('Email'),
//     password: Joi.string()
//         .trim().
//         min(3).max(20)
//         .required()
//         .label('password')
// });

// export const generateAccessToken = (payload) => {
//     let token = jwt.sign(payload, "squareboat", {
//         expiresIn: '30d', // 1d', '30m'
//     });
//     return token;
// };


// export const login = async (req, res) => {
//     try {
//         console.log("first", req.body)
//         // joi validation
//         let { error } = USerLoginSchema.validate(req.body, options)
//         if (error) {
//             return res.status(400).json({ message: error.details[0]?.message, statusCode: 400 })
//         }
//         let { email, password } = req.body

//         let findEmail = await UserModel.findOne({ where: { email }, raw: true })

//         console.log(findEmail, "findEmailfindEmail")

//         if (!findEmail) {
//             return res.status({ message: "User not found, kindly register first", statusCode: 400 })
//         }
//         console.log(findEmail, "findemali")
//         let checkpassword = await bcrypt.compare(password, findEmail?.password);
//         console.log(checkpassword, "checkpassword ")

//         if (!checkpassword) {
//             res.status(400).json({ message: "Password is not valid" })
//             return;
//         }

//         delete findEmail.password
//         let generateToken = generateAccessToken(findEmail)
//         let access_token = generateAccessToken(findEmail)

//         await UserModel?.update({ access_token: access_token }, { where: { id: findEmail?.id } })

//         findEmail.token = generateToken

//         return res.status(200).json({ mesage: "login successfully", data: findEmail })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
//     }
// }


// export const logout = async (req, res) => {
//     try {
//         let user_obj = req.userData
//         let findUSer = await UserModel?.findOne({ where: { id: user_obj?.id } })
//         if (!findUSer) {
//             return res.status(400).json({ message: "user not found" })
//         }
//         await UserModel?.update({ access_token: null }, { where: { id: user_obj?.id } })
//         return res.status(200).json({ message: "logout success" })

//     }
//     catch (error) {
//         console.log(error, "errorerror")
//         return res.status(500).json({ message: error?.message })
//     }
// }