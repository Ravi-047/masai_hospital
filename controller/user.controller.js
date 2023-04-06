const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const user_exist = await User.findOne({ email });
        if (user_exist) {
            res.send("You are already registered Please Login");
        }
        else {
            bcrypt.hash(password, 5, async (err, secured_password) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    const new_user = new User({ email, password: secured_password, confirmPassword: secured_password });
                    await new_user.save();
                    res.send("User Registered Sucessfully");
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send("Registration Failed");
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const hassed_password = user.password;
        const ID = user._id;

        if (user) {
            bcrypt.compare(password, hassed_password, (error, result) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else if (result) {
                    const token = jwt.sign({ userID: ID }, process.env.KEY);
                    res.send({ "message": "Login successful", "token": token })
                }
                else {
                    res.send("Wrong Credential. Please try again")
                }
            })
        }

    } catch (error) {
        console.log(error);
        res.send("Login failed, something went wrong");
    }
}

module.exports = { registerUser, loginUser }