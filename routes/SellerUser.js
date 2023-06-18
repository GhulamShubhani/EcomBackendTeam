import express from "express";
import {SellerUserRegistration,SellerUserlogin} from "../controler/SellerUserControler.js"

export const sellerRouter = express.Router()

sellerRouter.post("/createuser",SellerUserRegistration)
sellerRouter.post("/login",SellerUserlogin)
