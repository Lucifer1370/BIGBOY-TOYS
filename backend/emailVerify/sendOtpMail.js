const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendOtpMail = async (otp, email) => {
    
    try{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailConfiguration = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password reset OTP",
       html:`<p>your Otp for Password reset is <b>${otp}</b></p>`
    };

     await transporter.sendMail(mailConfiguration) 
       
        console.log("OTP sent Successfully");
    }
    catch(error){
     console.log("email error ",error);
        
    }

};
module.exports = { sendOtpMail };
