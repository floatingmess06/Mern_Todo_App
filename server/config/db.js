const mongoose = require('mongoose');
require('dotenv').config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

let connection;
const connectDb = async () =>{
    try {
        connection = await mongoose.connect(dbConnectionString);
        console.log("MongoDb is connected....!");
    } catch (error) {
        console.log("Error in connecting MongoDb!!");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports ={connectDb,connection};
