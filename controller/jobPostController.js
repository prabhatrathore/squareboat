import Joi from "joi";
import UserModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
let salt = 10
import jwt from 'jsonwebtoken'
import jobPostModel from "../model/jobPostModel.js";
import { sendemail } from "../helper/nodemailer.js";

export const jobPostSchema = Joi.object({
    title: Joi.string().
        min(3).max(90)
        .trim()
        .required()
        .label('title'),
    description: Joi.string()
        .trim().
        min(3).max(1000)
        .required()
        .label('description')
});

export const applyjobPostSchema = Joi.object({
    id: Joi.string()
        .trim()
        .required()
        .label('id'),
});


const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
};

export const add = async (req, res) => {
    try {
        // console.log("first", req.body)
        // joi validation
        let { error } = jobPostSchema.validate(req.body, options)

        if (error) {
            return res.status(400).json({ message: error.details[0]?.message, statusCode: 400 })
        }
        let { title, description } = req.body
        let userObj = req.userData
        // console.log(userObj, 'userObj userObj ')
        // return

        // check email is exist in db or not
        let emailcheck = await jobPostModel.findOne({ where: { title, user_id: userObj?.id }, attributes: ['id', 'title'], raw: true })
        if (emailcheck) {
            return res.status(400).json({ message: `This job is already added`, statusCode: 400, success: false })
        }

        let obj = {
            title,
            description,
            user_id: userObj?.id,
            updated_at: Date.now(),
            created_at: Date.now(),
        }

        await jobPostModel.create(obj)

        return res.status(200).json({ mesage: "Job added Successs", statusCode: 200, success: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error?.message, statusCode: 500, success: false })
    }
}


//recruiter only
export let get_job_reach = async (req, res) => {
    try {
        let user_obj = req.userData
        let getAll = await jobPostModel?.findAll({ where: { user_id: user_obj.id }, raw: true })

        let fetchuser = getAll?.map((a, b) => {
            let temp = []
            if (a?.applied_user?.length > 0) {
                temp = [...temp, ...a?.applied_user]
            }
            return temp
        })
        let getuserdata = []
        if (fetchuser?.length > 0) {
            getuserdata = await UserModel?.findAll({ Where: { id: fetchuser }, raw: true, attributes: ['name', 'email', 'id'] })
        }

        for (let le of getAll) {
            // console.log(le, "lele")
            le?.applied_user?.forEach((a, b) => {
                let ceckuser = getuserdata?.find((elem) => elem?.id == a?.user_id)
                if (ceckuser) {
                    a.userObj = ceckuser
                }
                return a
            })
        }

        return res.status(200).json({ message: 'success', data: getAll })
    } catch (error) {
        console.log(error, "erororget job reach  ")
        return res.status(500).json({ message: error?.mesage })
    }
}


///candidate apply job
export let apply_job = async (req, res) => {
    try {
        let { error } = applyjobPostSchema.validate(req.query, options)
        if (error) {
            return res.status(400).json({ message: error.details[0]?.message, statusCode: 400 })
        }

        let { id } = req.query

        let user_obj = req.userData
        let get = await jobPostModel?.findOne({ where: { id: id }, raw: true })
        // console.log(get, "<<<3", user_obj?.id)
        if (!get) {
            return res.status(400).json({ message: "Job not available or expired", statuscode: 400 })
        } else if (get?.user_id == user_obj?.id) {
            return res.status(400).json({ message: "You cannot apply for your own job", statuscode: 400 })

        }

        // return

        let userAlreadyapply_or_not = get?.applied_user?.find((a) => a?.user_id == user_obj.id)
        if (userAlreadyapply_or_not) {

            return res.status(400).json({ message: "You already applied", statuscode: 400 })
        }

        let temp = get?.applied_user
        if (temp?.length > 0) {

            temp.push({ user_id: user_obj.id })
        } else {
            temp = [{ user_id: user_obj.id }]
        }
        await jobPostModel.update({ applied_user: temp }, { where: { id: get?.id } })
        let obj = {
            title: get?.title,
            email: user_obj?.email,
            text:"Job applied successfully"
        }
        try {
            await sendemail(obj)


            //recruiter send email 
            let fetch_recruiter = await UserModel?.findOne({ where: { id: get?.user_id }, raw: true })
            obj.email = fetch_recruiter?.email
            obj.text=`Job apply by This ${user_obj?.name} candidate on this job ${get?.title}`
            await sendemail(obj)
        } catch (error) {
            console.log(error, "eorro while aplly job")
        }

        return res.status(200).json({ message: 'successfully job applied', })
    } catch (error) {
        console.log(error, "erorr apply")
        return res.status(500).json({ message: error?.mesage })
    }
}

///candidate job  list only
export let get_job_list = async (req, res) => {
    try {
        let getAll = await jobPostModel?.findAll({ raw: true })

        let getuserdata = req.userData

        let temp = []
        for (let le of getAll) {
            // console.log(le, "lele")
            let get = le?.applied_user?.find((a, b) => a?.user_id == getuserdata?.id)
            console.log(get,"getuserdata",getuserdata?.id)
            if (get) {
                temp.push(le)
            }
        }

        return res.status(200).json({ message: 'success', data: temp })
    } catch (error) {
        console.log(error, "erororget job reach  ")
        return res.status(500).json({ message: error?.mesage })
    }
}

