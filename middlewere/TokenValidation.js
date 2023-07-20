import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

export const  tokenValidation = asyncHandler(async (request, response ,next)=>{
    let token
    let authHeader = request.headers.authorization || request.headers.Authorization
    // console.log("authtoken1",authHeader,token);
    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        // console.log("authtoken2",token);
        jwt.verify(token,process.env.SECERT_KEY,(err,decode)=>{
            if (err) {
                response.status(401);
                throw new Error("User is not authorized");
              }
              request.user = decode.user
              next()
        })

        if (!token) {
            response.status(401);
            throw new Error("User is not authorized or token is missing");
          }
    }
})