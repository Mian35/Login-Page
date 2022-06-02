const mongoose = require("mongoose");
//const validator = require("validator");

const RegesterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        unique: true
    }

})
const Regester = mongoose.model("Regester", RegesterSchema)

module.exports = Regester;