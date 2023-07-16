import express from "express";
import {AllUserRegistration,AllUserlogin,AllUserToken,UserExist,forgetPassword} from "../controler/AllUserControler.js"

export const AllUser = express.Router()

AllUser.post("/createuser",AllUserRegistration)
AllUser.post("/login",AllUserlogin)
AllUser.post("/authtoken",AllUserToken)
AllUser.post("/userexist",UserExist)



AllUser.post("/forgetpassword",forgetPassword)


AllUser.get("/test",(req,res)=>{
    res.json({data:"data send "})
})
