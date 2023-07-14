import express from "express";
import {SellerUserRegistration,SellerUserlogin,SellerUserToken,UserExist,forgetPassword} from "../controler/SellerUserControler.js"

export const sellerRouter = express.Router()

sellerRouter.post("/createuser",SellerUserRegistration)
sellerRouter.post("/login",SellerUserlogin)
sellerRouter.post("/authtoken",SellerUserToken)
sellerRouter.post("/userexist",UserExist)



sellerRouter.post("/forgetpassword",forgetPassword)


sellerRouter.get("/test",(req,res)=>{
    res.json({data:"data send "})
})
