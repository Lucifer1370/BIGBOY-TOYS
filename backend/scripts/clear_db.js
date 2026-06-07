require("dotenv").config();
const mongoose = require("mongoose");
const Car = require("./models/carModel");

const clearDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB successfully for cleaning");
        const deleteResult = await Car.deleteMany({});
        console.log(`Successfully deleted ${deleteResult.deletedCount} duplicate/old cars from MongoDB.`);
        process.exit(0);
    } catch (err) {
        console.error("Error clearing database:", err);
        process.exit(1);
    }
};

clearDB();
