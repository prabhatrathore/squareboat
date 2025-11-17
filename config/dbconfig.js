import { config } from 'dotenv'
import { DataTypes, Sequelize } from 'sequelize'

// import dotenv from 'dotenv'
// dotenv.config()
config()
console.log(process.env.PORT, "W")

const dbconnection = new Sequelize(
    "squareboat",
    'root',
    "root@123",
    {
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        timezone: "+04:00",
        define: {
            timestamps: true
        },
        pool: {
            max: 15,
            min: 0,
            maxIdleTime: 1000,
            acquire: 30000000,
            idle: 100000000,
        },
        logging: false
        // pool:{
        //     max:
        // }
    }

)
export default dbconnection