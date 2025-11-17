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

///////
// app.listen(process.env.PORT, (resolve, reject) => {
//     console.log(`start listening PORT ${process.env.PORT}`)
// });
// =============================================================================
import express from 'express'
import dotenv from 'dotenv'
import UserModel from './model/userModel.js'
import orderModel from './model/orderModel.js'
import { Op, Sequelize } from 'sequelize'
import dbconnection from './config/dbconfig.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/h', (req, res) => {
    return res.status(200).json({ message: "fetch data" })
});

app.listen(process.env.PORT || 2000, (res, rej) => {
    console.log(`listening port: ${process.env.PORT || 2000} `)
})
// SELECT ...
// FROM ...
// JOIN ...
// WHERE ...
// GROUP BY ...
// HAVING ...
// ORDER BY ...
// LIMIT 
async function sol() {
    console.log('first')
    let get = await UserModel?.findAll({ raw: true, attributes: ['name', 'id', 'email', 'user_type'] })
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