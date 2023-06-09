const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGO_URI);

module.exports = { connection }
