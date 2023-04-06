const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.connection");
const { userRouter } = require("./router/user.router");
require("dotenv").config();



const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}))


app.get("/", (req, res) => {
    res.send("Welcome to Masai Hospital")
})

app.use("/users", userRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connection established successfully")
    } catch (error) {
        console.log("Connection Error");
        console.log(error);
    }
    console.log(`listening on http://localhost:${process.env.PORT}`)
})