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
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://bigboy-toys.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true
}))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/car', carRoute)
app.use('/api/v1/booking', bookingRoute)

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
})