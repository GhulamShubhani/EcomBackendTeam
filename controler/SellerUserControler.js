import express from "express";
import asyncHandler from "express-async-handler"
import SellerAdmin from "../models/sellerAddmin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const SellerUserRegistration = asyncHandler(async (request, response) => {
  
    try {
        const fullName = request.body.fullName
        const email = request.body.email
        const password = request.body.password
        const mobileNumber = request.body.mobileNumber

        if (!fullName || !email || !password || !mobileNumber) {
            return response.status(400).json({ data: "some field is missing" })
            // throw new Error("backend problem ")
        } else {
           

            try {
                const checkemail = await SellerAdmin.find({email})
                if(checkemail.length !== 0){
                    return response.status(400).json({message:"email already exist"})
                }
                // Generate a salt
                // process.env.SALTROUNDS
                const salt = await bcrypt.genSalt(10);
                // Hash the password with the generated salt
                const hash = await bcrypt.hash(password, salt);
                const Data = {
                    fullName : request.body.fullName,
                    email : request.body.email,
                    password : hash,
                    mobileNumber : request.body.mobileNumber,
                }
                const User = await SellerAdmin.create(Data)
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

                console.log(user,"user");
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