const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    entries: {
        type: Number,
        default: 0
    },

    joined: {
        type: Date, 
        default: Date.now,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;