const mongoose = require("mongoose");
const Group = require('../../group/model/group');
const Schema = mongoose.Schema;

const users = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    resetToken: String,
    expireToken: Date,
    date: {
        type: String,
    },

    status: {
        type: String,
        default: 'active'
    },
    role: {
        type: String,
        default: 'user'
    },
})

module.exports = mongoose.model("Users", users);
