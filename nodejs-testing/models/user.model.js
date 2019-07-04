const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    gender: {
        type: String,
        required: true
    }
});

module.exports.User = mongoose.model("Agent", userSchema);