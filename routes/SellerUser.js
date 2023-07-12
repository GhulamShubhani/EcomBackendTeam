import express from "express";
import {SellerUserRegistration,SellerUserlogin} from "../controler/SellerUserControler.js"

export const sellerRouter = express.Router()

sellerRouter.post("/createuser",SellerUserRegistration)
sellerRouter.post("/login",SellerUserlogin)
sellerRouter.get("/test",(req,res)=>{
    res.json({data:"data send "})
})
