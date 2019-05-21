const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    hash: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;