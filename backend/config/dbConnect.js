
const mongoose = require("mongoose")
const URL = process.env.DB_URL

const dbConnect = async() => {
    try {
        const connect = await mongoose.connect(URL);
        if(connect){
            console.log('MongoDB connected successfully');
        }
    } catch (error) {
        console.log("MongoDB connection error: ", error.message)
    }
}

module.exports = dbConnect;