const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://Mian_35:7735@cluster0.3g3gg.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully")
    })
}

module.exports = connectToMongo;