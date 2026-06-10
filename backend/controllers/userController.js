const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Session = require("../models/sessionModel.js");
const {sendOtpMail} = require("../emailVerify/sendOtpMail.js")
const { verifyEmail } = require("../emailVerify/verifyEmail.js");


const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already Exists"
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 12)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({
            id: newUser._id
        }, process.env.SECRET_KEY, { expiresIn: "10m" })
        // await verifyEmail(token, email)
        newUser.token = token
        await newUser.save()
        return res.status(201).json({
            success: true,
            message: "User registered successfully! Please log in.",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
};


const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
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
        user.token = null;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email Verified successfully",
            user: user
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const reVerify = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not founf"
            })
        }
        const token = jwt.sign({ id: user._id },
            process.env.SECRET_KEY, { expiresIn: "10m" })
        verifyEmail(token, email);
        user.token = token;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Token send successfully",
            token: user.token
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })

        }
        const existuser = await User.findOne({ email })
        if (!existuser) {
            return res.status(400).json({
                success: false,
                message: "User not Found"
            })
        }
        const isPasswordValid = await bcryptjs.compare(password, existuser.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "invalid password"
            })
        }
        if (existuser.isVerified === false) {
            return res.status(400).json({
                success: false,
                message: "verify your account then login"
            })
        }

        const accessToken = jwt.sign({ id: existuser._id }, process.env.SECRET_KEY, { expiresIn: "15m" })
        const refreshToken = jwt.sign({ id: existuser._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

        existuser.isLoggedIn = true;
        await existuser.save();

        const existSession = await Session.findOne({ userId: existuser._id })
        if (existSession) {
            await Session.deleteOne({ userId: existuser._id })
        }

        await Session.create({ userId: existuser._id })
        return res.status(200).json({
            success: true,
            message: `Welcome back ${existuser.firstName}`,
            accessToken,
            refreshToken,
            user: existuser
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const logout = async (req, res) => {
    try {
        const userId = req.user.id;
        await Session.deleteMany({ userId: userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });
        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}



const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.otpExpiry && user.otpExpiry > Date.now()) {
            return res.status(400).json({
                message: "OTP already sent. Try again later"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();

        await sendOtpMail(otp, email)

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const verifyOTPandResetPas= async (req,res)=>{
try {

    const {email, otp, password}= req.body;
     if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }
    
    if(user.otp !== otp){
        return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }
   const hashedPassword = await bcryptjs.hash(password, 12);

    user.password = hashedPassword;
    user.otp= null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  

} catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
}
};




 const getAllUser = async(req,res)=>{
    try {
        const users = await User.find()
        return res.status(200).json({
            success:true,
            users
        });
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
 }




const getUserbyId = async(req,res)=>{
    try {
        const {userId}= req.params;
        const user = await User.findById(userId).select("-password -otp -otpExpiry -token")
        if(!user){
            return res.status(400).json({
               success:false,
               message:'user not found' 
            })
        }
        res.status(200).json({
            success:true,
            user
        })

        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: error.message
        })
        
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName, lastName, phone, address, city, pincode } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;
        if (city !== undefined) user.city = city;
        if (pincode !== undefined) user.pincode = pincode;

        await user.save();

        const updatedUser = await User.findById(userId).select("-password -otp -otpExpiry -token");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const toggleWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { carId } = req.body;

        if (!carId) {
            return res.status(400).json({
                success: false,
                message: "Car ID is required"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const index = user.savedCars.indexOf(carId);
        let message = "";
        if (index === -1) {
            user.savedCars.push(carId);
            message = "Car saved to wishlist";
        } else {
            user.savedCars.splice(index, 1);
            message = "Car removed from wishlist";
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message,
            savedCars: user.savedCars
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("savedCars");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            wishlist: user.savedCars
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { register, verify, reVerify, login, logout, forgotPassword , verifyOTPandResetPas , getAllUser , getUserbyId, updateProfile, toggleWishlist, getWishlist };