import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userIndex.js'
import jobPostRoutes from './routes/jobPostIndex.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dotenv.config()

// console.log("start", process.env.PORT, "PPPPPPPPPPPPPPPPPPPPP")

app.use("/hello", (req, res) => {
    console.log("hellow world")
    return res.status(200).json({ message: "Successs", statusCode: true })
})
app.use("/user", userRoutes)
app.use("/job_post",jobPostRoutes)


app.listen(process.env.PORT, (resolve, reject) => {
    console.log(`start listening PORT ${process.env.PORT}`)
})