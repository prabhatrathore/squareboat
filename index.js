// import express from 'express'
// import dotenv from 'dotenv'
// import userRoutes from './routes/userIndex.js'
// import jobPostRoutes from './routes/jobPostIndex.js'

// const app = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// dotenv.config()

// // console.log("start", process.env.PORT, "PPPPPPPPPPPPPPPPPPPPP")

// app.use("/hello", (req, res) => {
//     console.log("hellow world")
//     return res.status(200).json({ message: "Successs", statusCode: true })
// })
// app.use("/user", userRoutes)www
// app.use("/job_post", jobPostRoutes)
//
// app.listen(process.env.PORT, (resolve, reject) => {
//     console.log(`start listening PORT ${process.env.PORT}`)
// });
// =====================
import express from 'express'
import { UserModel, productModel, cartModel, orderModel } from './model/association.js'
import { Op } from 'sequelize'
import dbconnection from './config/dbconfig.js'
import mongoose from 'mongoose'
import { userMongoModel2 } from './model/userModel.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/server", (req, res) => {
    return res.json({ message: "server connected", statusCode: 200 })
})

app.listen(2000, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log("success listening")
    }
})
mongoose.connect("mongodb+srv://geekwhos_db_user:k22tuG18nUn3DZtx@cluster0one.txeu31i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0one").then((a) => {
    console.log("succcess db", 'a')
}).catch((er) => {
    console.log(er, 'errr')
})

async function solMongo() {
    // ✔ 3. Find with multiple conditions
    let obj = {
        name: "sonu one", age: 23,
        email: "abc4@gmail.com",
        password: "password3",
        user_type: "admin",
    }
    let get = ''
    // let result = await userMongoModel2.create(obj)
    // console.log(result, 'resultresult')
    //-----------------------------------------------------------------------------
    //  get = await userMongoModel2.find({ name: "john" })

    //-----------------------------------------------------------------------------
    //  get = await userMongoModel2.find({ name: "john",age:21 }) // AND

    // //-----------------------------------------------------------------------------
    // get = await userMongoModel2.find({
    //     $or: [
    //         // { age: 21 },
    //         { age: 22 },
    //         { name: "sonu one" },
    //         // { name: "john" }
    //     ]
    // })
    //-----------------------------------------------------------------------------
    // //-----------------------------------------------------------------------------
    // ✔ 5. IN operator
    //     db.users.find({ age: { $in: [20, 25, 30] } })
    // get = await userMongoModel2?.find({
    //     age: { $in: [21] },
    //     name: { $in: ["sonu"] }
    // })
    // get = await userMongoModel2?.find({
    //     age: { $in: [21,23] },
    //     // age: { $in: [23] },// here is redefine this 'age' data
    //     // name: { $in: ['john','johny one'] }
    // })

    //////////////////////////////////////////////////////////////

    // ✔ 6. NOT IN operator
    //     db.users.find({ age: { $nin: [18, 40] } })
    // get = await userMongoModel2?.find({
    //     age: { $nin: [21, 23] },
    //     name: { $nin: ['johny',] }
    // })

    // ✔ 7. Comparison operators
    // Greater than, Less than
    //     db.users.find({ age: { $gt: 18 } })
    //     db.users.find({ age: { $lt: 40 } })
    //     db.users.find({ age: { $gte: 18, $lte: 30 } })
    get = await userMongoModel2.find({
        // age: { $gte: 23 }
        // age: { $gt: 23 },
        age: { $gt: 21, $lte: 43 }
    }, { name: 1, age: 1, email: 1, password: 1 })

    // for (let le of get) {
    //     let age = Number(le.age)||20
    //     let get1 = await userMongoModel2.findOneAndUpdate(
    // { _id: le._id },      // find condition
    // { $set: { age: age } }, // updated field
    // {new :true }    //return updated document
    //  )
    //     console.log(get1, 'gttttttttttt')

    // get=await userMongoModel2.findOneAndUpdate(
    //     {_id:le._id},
    //     {$inc:{stock:-1}},
    //     {new:true}
    // )
    // console.log(get.,'wwwwwww)

    // ✅ 3. Update Only If Document Exists (Upsert)
    // If not found → create a new one.
    // let g = await userMongoModel2.findOneAndUpdate(
    //     { email: "admin@gmail.com" },
    //     { $set: { role: "admin" } },
    //     { new: true, upsert: true }
    // )
    // ✅ 4. Add Item to Array Using $push
    // g = await userMongoModel2.findOneAndUpdate(
    //     { _id: le._id },
    //     { $push: { wishlist: tempId } },
    //     { new: true }
    // )
    // ✅ 5. Remove Item From Array Using $pull
    // g = await userMongoModel2.findOneAndUpdate(
    //     // (_id: le._id),
    //     { $pull: { wishlist: temp_product_id } },
    //     { new: true }
    // )

    // }

    // ✔ 8. Projection — select only specific fields
    //     db.users.find({}, { name: 1, age: 1, _id: 0 })  // include fields

    // get = await userMongoModel2.find({ age: { $gt: 20 } }, { name: 1, age: 1, password: 1 }).sort({ age: -1 })
    // ✔ 9. Sort the result
    //     db.users.find().sort({ age: 1 })   // Ascending
    //     db.users.find().sort({ age: -1 })  // Descending

    // get = await userMongoModel2.find({ age: { $gt: 2, $lt: 44 } }, { name: 1, age: 1 }).skip(0).limit(40)
    // ✔ 10. Limit / Skip(Pagination)
    //     db.users.find().limit(10)
    //     db.users.find().skip(20)
    //     db.users.find().skip(20).limit(10) // page results
    // ✔ 11. Count records
    //     db.users.countDocuments({ age: 25 })
    // get = await userMongoModel2.countDocuments({ age: 24 })
    // ----------------------------------------------------------------------------------------------


    // ----------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------

    // ✔ 12. Check document exists
    //     db.users.findOne({ email: "abc@test.com" })
    // get=await userMongoModel2.findOne({email:'admin@gmail.com'})
    // ---------------------------------------------------------------------------------------------------

    // ✔ 13. Regex search
    //     db.users.find({ name: { $regex: "^A", $options: "i" } })
    // get = await userMongoModel2.find({ name: { $regex: "^joh" } })
    // ---------------------------------------------------------------------------------------------------

    // ✔ 14. Find inside nested object
    //     db.users.find({ "address.city": "Mumbai" })
    get = await userMongoModel2.find()
    let i = 110045
    // console.log(Math.round(Math.random() * 10000), 'Math.random()*1000 ')
    for (let le of get) {
        let random = Math.round(Math.random() * 10000)
        let addobj = {
            street: random,
            name: `name of location number: ${random}`,
            pincode: i
        }
        i = i + 1
        // await userMongoModel2?.findOneAndUpdate({ _id: le._id }, { address: addobj })
        let wishlist = ['abcd', 'efg', 'hijkl', 'mnop', 'qrst', 'uvwx']
        let temp = random + 'abcd' + random
        wishlist.push(temp)
        // await userMongoModel2?.findOneAndUpdate({ _id: le._id }, { wishlist: wishlist })
        let test_number = [random]
        // await userMongoModel2.findOneAndUpdate({ _id: le._id }, { test_number })
    }
    // ---------------------------------------------------------------------------------------------------
    // get =await userMongoModel2.find({"address.pincode":110046})
    // ---------------------------------------------------------------------------------------------------

    // ✔ 15. Find inside array
    //     db.users.find({ hobbies: "cricket" })
    // get = await userMongoModel2.find({ wishlist: "2424abcd2424" }, { name: 1, wishlist: 1 })
    // ---------------------------------------------------------------------------------------------------

    // ✔ 16. Find array containing element > condition
    //     db.products.find({ prices: { $elemMatch: { $gt: 500 } } })
    //  get = await userMongoModel2.find({ test_number: { $elemMatch: { $gte: 8620 } } })

    // ---------------------------------------------------------------------------------------------------
    // ✔ 17. Aggregation(Group + Count)
    //     db.users.aggregate([
    //         { $group: { _id: "$city", total: { $sum: 1 } } }
    //     ])
    // ---------------------------------------------------------------------------------------------------

    // ✔ 18. Aggregation(Match + Group + Sort)
    //     db.orders.aggregate([
    //         { $match: { status: "DELIVERED" } },
    //         { $group: { _id: "$customerId", totalAmount: { $sum: "$amount" } } },
    //         { $sort: { totalAmount: -1 } }
    //     ])

    // ✔ 19. Join(lookup) — fetch data from 2 collections
    //     db.orders.aggregate([
    //         {
    //             $lookup: {
    //                 from: "users",
    //                 localField: "userId",
    //                 foreignField: "_id",
    //                 as: "userDetails"
    //             }
    //         }
    //     ])

    // ✔ 20. Distinct values
    //     db.users.distinct("city")

    // ✔ 22. Search in an array with AND
    // db.users.find({ skills: { $all: ["Node", "React"] } })

    // ✔ 23. Advanced match with logical operators
    //     db.users.find({
    //         $and: [{ age: { $gt: 18 } }, { verified: true }]
    //     })

    // ✔ 24. Text Search(requires index)
    //     db.products.find({ $text: { $search: "laptop" } })

    // ✔ 25. Fetch only latest record
    //     db.logs.find().sort({ createdAt: -1 }).limit(1)

    // 🚀 Bonus — Full Pagination Query
    //     const page = 2;
    //     const size = 10;
    //     db.users.find()
    //         .skip((page - 1) * size)
    //         .limit(size)
    //         .sort({ createdAt: -1 });
    console.log(get, 'ggggg')
}
// solMongo()

// SELECT ...
// FROM ...
// JOIN ...
// WHERE ...
// GROUP BY ...
// HAVING ...
// ORDER BY ...
// LIMIT ... 

app.use("/get", async (req, res) => {
    let get = []
    //   get =await UserModel?.findAll({ raw: true, attributes: ['name', 'id', 'email', 'user_type'] })
    get = await UserModel?.findAll({
        where: { id: 16 },
        // where: { email: { [Op.like]: '%use10%' } },
        // raw: true,
        attributes: ['name', 'id', 'email', 'user_type'],
        include: [
            {
                model: productModel,
                separate: true,
                order: [['id', 'DESC']],
                // where: { name: "samsung s24 ultra" }
            },
            {
                model: cartModel,
                separate: true,
                order: [['id', 'DESC']],
                attributes: ['id', 'user_id', 'product_id', 'quantity']
            }
        ]
    })
    // get = await productModel.findAll({
    //     // raw: true,
    //     where: {},
    //     include: [
    //         {
    //             // where: { email: 'use10@yopmail.com' },
    //             where: { email: { [Op.like]: '%use10%' } },
    //             model: UserModel,
    //             attributes: ['id', 'name', 'email']
    //             // separate: true
    //         }
    //     ]
    // })
    // get = await cartModel.findAll({
    //     // raw: true,
    //     where: {},
    //     include: [
    //         {
    //             // where: { email: 'use10@yopmail.com' },
    //             where: { email: { [Op.like]: '%use10%' } },
    //             model: UserModel,
    //             attributes: ['id', 'name', 'email']
    //             // separate: true
    //         },
    //         {
    //             model: productModel,
    //             include: [
    //                 { model: UserModel }
    //             ]

    //         }
    //     ]
    // })
    return res.json({ data: get })
})
async function sol() {
    console.log('first')
    let get = []
    //   get =await UserModel?.findAll({ raw: true, attributes: ['name', 'id', 'email', 'user_type'] })
    get = await UserModel?.findOne({
        where: { id: 16 },
        // raw: true,
        attributes: ['name', 'id', 'email', 'user_type'],
        include: [
            { model: productModel /*,as:'product'*/ },
            { model: cartModel/*,as:'cart'*/ }
        ]
    })
    // console.log(get, "get user all")
    let page = 1
    let limit = 3
    let offset = (page - 1) * limit
    // let order = []
    let obj = {
        order_id: Math.ceil(Number(Date.now().toString().split("").reverse().join("")) / 1000000),
        order_date: new Date(),
        amount: 410,
        user_id: 16,
        products: ['2', '4', '3']
    }
    obj = {
        user_id: 16,
        name: "samsung s21 ultra",
        description: "south korean ",
        quantity: 100302
    }
    obj = {
        user_id: 16,
        product_id: 4,
        quantity: 245,
    }
    // let g1 =await cartModel.create(obj)
    // console.log(g1.id,'ggggggggggg')
    // await productModel.create(obj)
    // await orderModel.create(obj)
    // --------------------------------------------------------------------------------------
    let order = await orderModel.findAll({
        where:
            // Sequelize.where(Sequelize.fn("JSON_CONTAINS", Sequelize.col("products"), JSON.stringify('3'))),
            { products: { [Op.eq]: '3' } },
        raw: true,
        limit,
        offset,
        // order: [[Sequelize.literal("CAST( amount as UNSIGNED)"), 'ASC']]
    })

    // console.log(order, "findall")
    //-------db query--------------------------------
    let str = `
SELECT ordermodel.amount, ordermodel.products FROM ordermodel
WHERE JSON_CONTAINS(products,'"3"')
`
    str = `
SELECT ordermodel.user_id,ordermodel.id AS MAINID , ordermodel.amount,ordermodel.products FROM ordermodel 
WHERE JSON_CONTAINS(products,'"3"') 
LIMIT 11 OFFSET 1
`
    let [g] = await dbconnection.query(str)
    // console.log(g, 'gggg')

    //-------db query--------------------------------
    let str1 = `
    SELECT * FROM ordermodel 
    ORDER BY CAST (amount AS UNSIGNED) DESC 
    LIMIT 1 OFFSET 1     `
    str1 = `SELECT ordermodel.amount,ordermodel.id AS MAINID, ordermodel.products FROM ordermodel
ORDER BY CAST(amount AS UNSIGNED) DESC 
LIMIT 1 OFFSET 2      
`
    str1 = `
SELECT ordermodel.amount, ordermodel.products,ordermodel.id FROM ordermodel
ORDER BY CAST(amount AS UNSIGNED) DESC 
LIMIT 2 offset 0
`
    let [order1] = await dbconnection?.query(str1)

    // console.log(order1, 'ror order')
    //--------------------------------------------------------------------------------
    let str2 = `SELECT  * from ordermodel    `
    let [order2] = await dbconnection.query(str2)  // here we got [rawdata, metadata] 
    // console.log(order2, 'ror order')
    //--------------------------------------------------------------------------------
    let str31 = `
    SELECT user_id,  order_date,amount FROM ordermodel 
    `
    let [order31] = await dbconnection.query(str31)
    // console.log(order31,"3131313131")
    //----------------------------------Meaning: Fetch only rows where amount is greater than 1000.----------------------------------------------
    let str32 = ` 
    SELECT order_id AS ID,amount AS amt,id FROM ordermodel 
    WHERE amount>600 `
    str32 = `SELECT order_id,amount FROM ordermodel 
    WHERE amount>2100  
    ORDER BY CAST(amount AS UNSIGNED) DESC
    limit 3 OFFSET 0
    `
    let [order32] = await dbconnection.query(str32)
    // console.log(order32,"orde3232322323232")
    //--------------------------------------------------------------------------------

    // ✅ 3. ORDER BY → Sorting (ASC / DESC)
    let str3 = `
    SELECT * FROM ordermodel 
    -- ORDER BY CAST(amount AS UNSIGNED)  ASC 
    ORDER BY id  DESC 
    `
    // let [order3]=await dbconnection.query(str3)
    // console.log(order3,'ordeeee')
    //--------------------------------------------------------------------------------

    // ✅ 4. LIMIT → Pagination / Restrict count of rows  ->Meaning: Skip first 10 rows and return next 10.
    // let str = `
    //     SELECT order_id,amount,id FROM ordermodel 
    //     ORDER BY CAST(amount AS UNSIGNED) DESC
    //     LIMIT 3 OFFSET 3`
    // let [order] = await dbconnection.query(str)
    // console.log(order, "ppp")
    //--------------------------------------------------------------------------------
    /**
     ✅ 6. INNER JOIN → Fetch data from 2 tables where matching records exist
    
    Tables   Example:
    orders	    users
    user_id	    id
    amount	    name
    Meaning: Show orders with user details. Only matching user records
     */

    let str6 = `
    SELECT ordermodel.id AS MAINID , ordermodel.amount AS AMT,ordermodel.user_id, user.id, user.name FROM ordermodel
    INNER JOIN user
    ON ordermodel.user_id = user.id
    ORDER BY MAINID DESC
    limit 3 offset 0 
    `
    str6 = `
    SELECT ordermodel.id ,ordermodel.amount , ordermodel.user_id AS USERID, user.name FROM ordermodel 
    INNER JOIN user ON ordermodel.user_id=user.id
ORDER BY id DESC
LIMIT 55 OFFSET 1
    `
    str6 = `SELECT ordermodel.id AS MAINID , ordermodel.user_id,ordermodel.amount,user.id from ordermodel
    INNER JOIN user on ordermodel.user_id = user.id
    WHERE amount>2000 OR ordermodel.id=8
ORDER BY CAST(MAINID AS UNSIGNED) DESC 
LIMIT 3 OFFSET 0
    `
    let [order6] = await dbconnection.query(str6)
    // console.log(order6, "ordeeee66")
    //--------------------------------------------------------------------------------

    // ✅ 7. LEFT JOIN → Fetch all from left table + matching from right  question is which one is left table and right table
    let str7 = `SELECT ordermodel.amount, ordermodel.id AS MAINID, ordermodel.user_id AS Order_user_id,user.id FROM ordermodel 
    LEFT JOIN user ON ordermodel.user_id=user.id   
    WHERE amount > 40
     ORDER BY CAST(amount AS UNSIGNED) ASC
     LIMIT 30 offset 1
    `
    str7 = `SELECT ordermodel.id, ordermodel.amount, ordermodel.user_id,user.name FROM ordermodel
    LEFT JOIN user ON ordermodel.user_id=user.id
    ORDER BY CAST(ordermodel.amount AS UNSIGNED) DESC
    LIMIT 3 OFFSET 1`
    let [order7] = await dbconnection.query(str7)
    // console.log(order7, "ordder 7777")
    //-----------------------------------------------------------------------------------------

    let str71 = `SELECT user.name,user.id,ordermodel.user_id,ordermodel.id AS MAINID FROM user 
    LEFT JOIN ordermodel  ON user.id =ordermodel.user_id
   -- WHERE amount>50 
    ORDER BY MAINID DESC
    LIMIT 30 offset 0
    `
    str71 = `SELECT ordermodel.id AS mainID,user.id,user.name FROM user 
    LEFT JOIN ordermodel ON user.id=ordermodel.user_id
    ORDER BY mainID DESC
    LIMIT 33 OFFSET 0
    `
    let [order71] = await dbconnection.query(str71)
    // console.log(order71, 'order 7171711717')
    //--------------------------------------------------------------------------------
    // ✅ 8. RIGHT JOIN → Fetch all from right table + matching from left
    let str8 = `
    SELECT ordermodel.id AS MAINID, ordermodel.amount, user.id FROM ordermodel 
    RIGHT JOIN user ON ordermodel.user_id = user.id `

    str8 = `SELECT ordermodel.id AS mainid,user.id,user.name FROM user
    RIGHT JOIN ordermodel ON user.id=ordermodel.user_id
    `
    let [order8] = await dbconnection.query(str8)
    // console.log(order8, 'order888888')
    /**
     In SQL:
The table before JOIN keyword ⇒ LEFT TABLE
The table after JOIN keyword ⇒ RIGHT TABLE
So here:
Position	 Table Name
LEFT table	  orders
RIGHT table	  users
-------------------------------------------------------------------
✅ What does RIGHT JOIN mean?

A RIGHT JOIN will:
Return all rows from the RIGHT table (users),
and matching rows from LEFT table (orders) if available.

If a user does not have any order, orders.* will be NULL, but that user will still show up.
     */

    // ✅ 9. GROUP BY → Group records by field-->Count how many orders each user made.
    let str9 = `SELECT user_id , COUNT(*)AS total_orders FROM ordermodel
                GROUP BY user_id `
    str9 = `SELECT user_id, COUNT(*) AS total_orders FROM ordermodel
                GROUP BY user_id 
                LIMIT 1 `
    let [order9] = await dbconnection.query(str9)
    // console.log(order9, 'order999999999')
    //--------------------------------------------------------------------------------
    // ✅ 10. HAVING → Filter grouped results
    let str10 = `SELECT user_id, COUNT (*) AS total_orders FROM ordermodel
    GROUP BY user_id 
    HAVING total_orders > 0
     `
    let [get10] = await dbconnection.query(str10)
    // console.log(get10, 'get101010101010')

    //✅ 13. DISTINCT → Remove duplicates
    let str14 = `
    SELECT DISTINCT ordermodel.id AS main,ordermodel.user_id, user.id FROM ordermodel 
    RIGHT JOIN user ON ordermodel.user_id=user.id`
    str14 = `SELECT name FROM user 
 WHERE name LIKE '%a%' `

    let [order15] = await dbconnection.query(str14)
    console.log(order15, "orde1555555")
    //--------------------------------------------------------------------------------
    //     5. IN → Match multiple values
    // SELECT * FROM employees
    // WHERE department IN ('HR', 'Sales', 'Finance');
    //------------------------------------------------------------------------------------

    // 📌 Aggregation Functions (Interview favorite)
    // ✅ COUNT()
    // SELECT COUNT(*) AS total_employees FROM employees;

    // ✅ SUM()
    // SELECT SUM(salary) AS total_salary_paid FROM employees;

    // ✅ AVG()
    // SELECT AVG(salary) AS average_salary FROM employees;

    // ✅ MIN / MAX
    // SELECT MAX(salary), MIN(salary) FROM employees;
    //--------------------------------------------------------------------------------
    //     HAVING (filter after group by)
    // SELECT department, COUNT(*) AS total_employees
    // FROM employees
    // GROUP BY department
    // HAVING COUNT(*) > 5;
    //--------------------------------------------------------------------------------
    // 📌 Aliases (rename tables or columns)
    // SELECT name AS employee_name, salary AS employee_salary FROM employees;
    //----------------------------------------------------------------------------------------------------
    //     📌 ANY / ALL (used with subqueries)
    // ✅ ANY → true if any value matches
    // SELECT name FROM employees
    // WHERE salary > ANY (SELECT salary FROM employees WHERE department = 'Sales');

    // ✅ ALL → true only if all values match
    // SELECT name FROM employees
    // WHERE salary > ALL (SELECT salary FROM employees WHERE department = 'Sales');
    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------
    //     📌 CASE Expression (if-else in SQL)
    // SELECT name,
    //        salary,
    //        CASE
    //            WHEN salary > 60000 THEN 'High'
    //            WHEN salary BETWEEN 30000 AND 60000 THEN 'Medium'
    //            ELSE 'Low'
    //        END AS salary_level
    // FROM employees;

    // 📌 EXCEPT / INTERSECT (not in all DBs)
    // ✅ EXCEPT → return rows in 1st query not in 2nd
    // SELECT name FROM employees
    // EXCEPT
    // SELECT name FROM customers;

    // ✅ INTERSECT → return common rows
    // SELECT name FROM employees
    // INTERSECT
    // SELECT name FROM customers;

    // 📌 Fetch 2nd Highest Salary (important)

    // Using LIMIT:

    // SELECT salary FROM employees
    // ORDER BY salary DESC
    // LIMIT 1, 1;

    // 📌 Fetch Top 3 Salaries
    // SELECT salary FROM employees
    // ORDER BY salary DESC
    // LIMIT 3;
    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------
    // let find = await orderModel?.findOne({ where: { order_id } })
    //--------------------------------------------------------------------------------------------- 
    // let t = 765391
    // let o = 0
    // // console.log(Math.floor(t / 10))
    // while (t > 0) {
    //     let remainder = t % 10
    //     t = Math.floor(t/10)
    //     o = o * 10 + remainder
    // }
    // // console.log(o, 'oooo')
    // console.log(900000 / 12)
    // console.log(1000000 / 12)
}
sol()