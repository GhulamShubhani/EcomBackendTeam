import express, { response } from "express";
import asyncHandler from "express-async-handler"
import SellerAdmin from "../models/sellerAddmin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const SellerUserRegistration = asyncHandler(async (request, response) => {

    try {
        const {
            fullName,
            email,
            password,
            mobileNumber,
            gender,
            country,
            profilepic,
            device
        } = req.body;


        if (!fullName || !email || !password || !mobileNumber || !gender || !device) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {


            try {
                const checkemail = await SellerAdmin.find({ email })
                if (checkemail.length !== 0) {
                    return response.status(400).json({ message: "email already exist" })
                }
                // Generate a salt
                // process.env.SALTROUNDS
                const salt = await bcrypt.genSalt(10);
                // Hash the password with the generated salt
                const hash = await bcrypt.hash(password, salt);
                // Create a new seller admin instance
                const newSellerAdmin = new SellerAdmin({
                    fullName,
                    email,
                    password: hash,
                    mobileNumber,
                    gender,
                    country,
                    profilepic,
                    panNumber,
                    device
                });
                const User = await SellerAdmin.create(newSellerAdmin)
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




export const SellerUserlogin = asyncHandler(async (request, response) => {
    console.log("trrr");
    try {
        const email = request.body.email
        const password = request.body.password
        const device= request.body.device
        if (!email || !password|| !device) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
                const user = await SellerAdmin.findOne({ email });
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

export const UserExist = asyncHandler(async (request, response) => {
    try {
        const email = req.query.email
        if (!email) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            const user = await SellerAdmin.findOne({ email });
            if (!user) {
                return response.status(404).json({ message: "User not found" });
            } else return true
        }
    } catch (err) {
        console.log("Error in login: ", err);
        throw new Error("Backend problem");
    }
})

export const SellerUserToken = asyncHandler(async (request, response) => {
    console.log("trrr");
    try {
        const email = request.body.email
        const password = request.body.password

        if (!email || !password) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
            try {
                const user = await SellerAdmin.findOne({ email });
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