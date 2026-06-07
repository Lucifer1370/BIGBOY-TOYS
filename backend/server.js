const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./database/db.js");
const userRoute = require("./routes/userRoute.js");
const carRoute = require("./routes/carRoute.js");
const bookingRoute = require("./routes/bookingRoute.js");
const cors = require("cors")
dotenv.config();
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'http://localhost:5173',
    credentials :true
}))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/car', carRoute)
app.use('/api/v1/booking', bookingRoute)

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
})