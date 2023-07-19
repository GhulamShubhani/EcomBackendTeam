import express from "express";
import {AllUserRegistration,AllUserlogin,AllUserToken,UserExist,forgetPassword,
    deleteProfilePic,ChangePassword,sendEmailOTP} from "../controler/AllUserControler.js"

export const AllUser = express.Router()

AllUser.post("/createuser",AllUserRegistration)
AllUser.post("/login",AllUserlogin)
AllUser.post("/authtoken",AllUserToken)
AllUser.post("/userexist",UserExist)



AllUser.post("/forgetpassword",forgetPassword)
AllUser.post("/changepassword",ChangePassword)
AllUser.post("/sendotp",sendEmailOTP)
AllUser.post("/deleteprofilepic",deleteProfilePic)


AllUser.get("/test",(req,res)=>{
    res.json({data:"data send "})
})
