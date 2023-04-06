const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    confirmPassword: { type: 'string', required: true }
})

module.exports = mongoose.model("User", userSchema);