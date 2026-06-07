const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const verifyEmail = async(token, email) => {
    
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
        subject: "Verify your email for BigBoyToys.in",
        text: `Click on the link to verify your email : http://localhost:5173/verify/${token}`
    };
    await transporter.sendMail(mailConfiguration) 
       
        console.log("Email sent Successfully");
    }
    catch(error){
     console.log("email error ",error);
        
    }

};
module.exports = { verifyEmail };
