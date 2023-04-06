const express = require("express");
const { registerUser, loginUser } = require("../controller/user.controller");
const { createAppointment, getAppointment } = require("../controller/appointment.controller");
const { userAuth } = require("../middleware/userAuthMiddleware");


const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/appointments", userAuth, createAppointment)
userRouter.get("/appointments", userAuth, getAppointment)


module.exports = { userRouter };