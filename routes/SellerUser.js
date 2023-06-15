import express from "express";

export const sellerRouter = express.Router()

sellerRouter.post("/createuser",(request,response)=>{
    console.log("test");
})

