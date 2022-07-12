// external imports
const mongoose = require("mongoose");
require('dotenv').config()

// function to house DB connection
async function dbConnect() {
    //connect this app to database on mongoDb using mongoose and DB_URL conn string
    mongoose.connect(
        process.env.DB_URL,
        {
            // these options ensure that the connection is done properly
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true,
        }
    )
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    });
}

module.exports = dbConnect;