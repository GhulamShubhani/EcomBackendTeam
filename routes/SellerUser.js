import express from "express";
import {SellerUserRegistration} from "../controler/SellerUserControler.js"

export const sellerRouter = express.Router()

sellerRouter.post("/createuser",SellerUserRegistration)

