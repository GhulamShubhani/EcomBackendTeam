import express from "express";
import asyncHandler from "express-async-handler"
import SellerAdmin from "../models/sellerAddmin.js"


export const SellerUserRegistration = asyncHandler(async (request, response)=>{
    console.log("test11112")
    try{
        const fullName = request.body.fullName
        const email = request.body.email
        const password = request.body.password
        const mobileNumber = request.body.mobileNumber

        if(!fullName || !email || !password || !mobileNumber){
            // return response.status(400).json({data:"some field is missing"})
            throw new Error("backend problem ")
        }else{
            console.log("test2")
    
            try{
        
                console.log("test2",request.body)
                const User = await SellerAdmin.create(request.body)
                return response.json({message:"successfull",data:User})
            }catch(err){
                console.log("error in regidtration ",err);
                throw new Error("backend problem ")
            }
        }

    }catch(err){
        console.log(err);
    }
   
})