import express, { response } from "express";
import asyncHandler from "express-async-handler"
import AllUser from "../models/AllUser.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


export const AllUserRegistration = asyncHandler(async (request, response) => {

    try {
        const {
            type,
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            gender,
            country,
            profilepic,
            device
        } = request.body;


        if (!type || !firstName || !lastName || !email || !password || !mobileNumber || !gender || !device) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {


            try {
                const checkemail = await AllUser.find({ email })
                if (checkemail.length !== 0) {
                    return response.status(400).json({ message: "email already exist" })
                }
                // Generate a salt
                // process.env.SALTROUNDS
                const salt = await bcrypt.genSalt(10);
                // Hash the password with the generated salt
                const hash = await bcrypt.hash(password, salt);
                // Create a new seller admin instance
                const newAllUser = new AllUser({
                    type,
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    mobileNumber,
                    gender,
                    country,
                    profilepic,
                    device
                });
                const User = await AllUser.create(newAllUser)
                return response.json({ message: "successfull", data: User })
            } catch (err) {
                console.log("error in regidtration ", err);
                throw new Error("backend problem ")
            }
        }
    } catch (err) {
        console.log(err);
    }
})




export const AllUserlogin = asyncHandler(async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;
        const device = request.body.device;

        if (!email || !password || !device) {
            return response.status(400).json({ data: "Some fields are missing" });
        } else {
            try {
                const user = await AllUser.findOne({ email });
                if (!user) {
                    return response.status(404).json({ message: "User not found" });
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return response.status(401).json({ message: "Invalid password" });
                }
                user.device = device;
                await user.save()

                // Generate a JWT token
                const token = jwt.sign({ user }, process.env.SECERT_KEY);

                // Return the user details (except password and amount) and the token in the response
                const userDetails = { ...user.toObject(), password: undefined, amount: undefined };
                return response.json({ message: "Login successful", user: userDetails, token });
            } catch (err) {
                console.log("Error in login: ", err);
                throw new Error("Backend problem");
            }
        }
    } catch (err) {
        console.log(err);
    }
});

export const UserExist = asyncHandler(async (request, response) => {
    try {
        // const email2 = request.query.email;
        const email2 = request.body.email;
        console.log("email1", email2);
        if (!email2) {
            return response.status(400).json({ message: "Email field is missing" });
        } else {
            // const user = await SellerAdmin.findOne({ email });
            const user = await AllUser.findOne({ email: email2 });
            console.log(user, "user1");
            if (!user) {
                return response.status(404).json({ message: "User not found" });
            } else {
                return response.status(404).json({ message: "User found", data: true });;
            }
        }
    } catch (err) {
        console.log("Error in UserExist: ", err);
        throw new Error("Backend problem");
    }
});

export const AllUserToken = asyncHandler(async (request, response) => {
    console.log("trrr");
    try {
        const email = request.body.email
        const password = request.body.password

        if (!email || !password) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
                const user = await AllUser.findOne({ email });
                if (!user) {
                    return response.status(404).json({ message: "User not found" });
                }

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return response.status(401).json({ message: "Invalid password" });
                }

                console.log(user, "user");
                //   const newuser= 
                // Passwords match, generate a JWT token
                // const token = jwt.sign({ user }, process.env.SECERT_KEY, { expiresIn: '1h' });
                const token = jwt.sign({ user }, process.env.SECERT_KEY);

                // Return the token in the response
                return response.json({ message: "Login successful", token });
            } catch (err) {
                console.log("Error in login: ", err);
                throw new Error("Backend problem");
            }


        }
    } catch (err) {
        console.log(err);
    }
})


export const sendEmailOTP = asyncHandler(async (request, response) => {
    // console.log("sendotp");
    try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
                const user = await AllUser.findOne({ email });
                if (!user) {
                    return response.status(404).json({ message: "User not found" });
                }

                // Generate OTP dynamically (You can use your own OTP generation logic)
                const otp = generateOTP();
                // console.log(otp,"opt");
                // Create a transporter object with email service provider's SMTP configuration
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ghulam.shubhani00000@gmail.com',
                        pass: 'mjoyovhgbrrgzvzo',
                    },
                });
                // console.log("transporter",transporter);
                // Define email content and options
                const mailOptions = {
                    from: 'ghulam.shubhani00000@gmail.com',
                    to: email,
                    subject: 'OTP Verification',
                    text: `Your OTP is: ${otp}`,
                };
                // console.log(mailOptions,"mailoption");
                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending email:', error);
                        response.status(500).json({ error: 'Failed to send OTP via email' });
                    } else {
                        console.log('Email sent:', info.response);
                        response.json({ message: 'OTP sent via email' });
                    }
                });
            } catch (err) {
                console.log("Error in login: ", err);
                throw new Error("Backend problem");
            }
        }
    } catch (err) {
        console.log(err);
    }
});

// Helper function to generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export const forgetPassword = asyncHandler(async (request, response) => {
    console.log("trrrhhhh");
    try {
        const { email,otp } = request.body;
        if (!email || !otp) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
                const user = await AllUser.findOne({ email });
                if (!user) {
                    return response.status(404).json({ message: "User not found" });
                }

                // Generate OTP dynamically (You can use your own OTP generation logic)
                const otp = generateOTP();

                // Create a transporter object with email service provider's SMTP configuration
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    },
                });
                // Define email content and options
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'OTP Verification',
                    text: `Your OTP is: ${otp}`,
                };
                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending email:', error);
                        response.status(500).json({ error: 'Failed to send OTP via email' });
                    } else {
                        console.log('Email sent:', info.response);
                        response.json({ message: 'OTP sent via email' });
                    }
                });
            } catch (err) {
                console.log("Error in login: ", err);
                throw new Error("Backend problem");
            }
        }
    } catch (err) {
        console.log(err);
    }
});

export const ChangePassword = asyncHandler(async (request, response) => {
    console.log("trrr");
    try {
        const {email,password,newpassword} = request.body
        

        if (!email || !password || !newpassword) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
                const user = await AllUser.findOne({ email });
                if (!user) {
                    return response.status(404).json({ message: "User not found" });
                }
                console.log(email,password,newpassword,"0000000",user,request.user);

                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log("passwordMatch",passwordMatch);
                if (!passwordMatch) {
                    return response.status(401).json({ message: "Invalid password" });
                }

                console.log(user, "user");
                const salt = await bcrypt.genSalt(10)
                const hashpassword = await bcrypt.hash(newpassword,salt)
                
                user.password = hashpassword
                await user.save();

                // Return the token in the response
                return response.json({ message: "User password successfully" });
            } catch (err) {
                console.log("Error in login: ", err);
                throw new Error("Backend problem");
            }
        }
    } catch (err) {
        console.log(err);
    }
})

export const deleteProfilePic = asyncHandler(async (request,response)=>{
    try{
        const {email} = request.body 
        if(!email){
            return response.status(400).json({ data: "some field is missing" })
        }else{
            const user = await AllUser.findOne({email})
            if(!user){
                return response.status(404).json({ message: "User not found" });
            }
            user.profilepic = null
            await user.save();
        }

    }catch(err){ 
        console.log(err);
    }
})

export const deleteUser = asyncHandler(async (request,response)=>{
    try {
        const userId = request.params.userId;

        // Check if the user with the provided userId exists in the database
        const user = await AllUser.findById(userId);
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        // Perform any additional checks if needed (e.g., user authentication)

        // If all checks pass, proceed with deleting the user
        await AllUser.findByIdAndDelete(userId);

        return response.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log("Error in deleting user: ", err);
        return response.status(500).json({ message: 'Backend problem' });
    }
});





