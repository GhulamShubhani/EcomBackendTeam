import express from "express";
import { tokenValidation } from "../middlewere/TokenValidation.js";
import {AllUserRegistration,AllUserlogin,AllUserToken,UserExist,forgetPassword,
    deleteProfilePic,ChangePassword,sendEmailOTP,deleteUser,getUserDeta} from "../controler/AllUserControler.js"

export const AllUser = express.Router()

AllUser.post("/createuser",AllUserRegistration)
AllUser.post("/login",AllUserlogin)
AllUser.post("/authtoken",AllUserToken)
AllUser.post("/userexist",UserExist)



AllUser.post("/forgetpassword",forgetPassword)
AllUser.post("/sendotp",sendEmailOTP)


AllUser.get("/getuserdeta",tokenValidation,getUserDeta)
AllUser.post("/changepassword",tokenValidation,ChangePassword)
AllUser.post("/deleteprofilepic",tokenValidation ,deleteProfilePic)
AllUser.delete("/deleteuser/:userId", tokenValidation, deleteUser);

AllUser.delete("/deleteuser1", tokenValidation, (req,res)=>{
    res.json({data:"delete send "})
});



AllUser.get("/test",(req,res)=>{
    res.json({data:"data send "})
})
