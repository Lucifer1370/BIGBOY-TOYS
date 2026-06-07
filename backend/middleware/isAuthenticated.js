const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Invalid Authorization Token"
            })
        }
        const token = authHeader.split(" ")[1];
        let decoded
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY)

        } catch (error) {
            if (error.name == "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "Token Expired"
                });
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            });
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not Found"
            })
        }
        req.user = user;
        req.id = user._id;
        next();

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role == "admin") {
        next();
    }
    else {
        return res.status(403).json({
            message: "Access Denied : Admin Only"
        })
    }
}



module.exports = { isAuthenticated, isAdmin };

