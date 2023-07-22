import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const tokenValidation = asyncHandler(async (request, response, next) => {
//   console.log("token hai", request.headers);
  let token;
  let authHeader = request.headers.authorization || request.headers.Authorization;
//   console.log("authtoken1", authHeader, token);
  if (authHeader && authHeader.startsWith("Bearer" || "bearer")) {
    token = authHeader.split(" ")[1];
    // console.log("authtoken2", token);
    jwt.verify(token, process.env.SECERT_KEY, (err, decode) => {
      if (err) {
        response.status(401);
        return next(new Error("User is not authorized")); // Pass the error to the error handler middleware
      }
      request.user = decode.user;
      next(); // Call next to proceed to the next middleware or route handler
    });
  } else {
    response.status(401);
    return next(new Error("User is not authorized or token is missing")); // Pass the error to the error handler middleware
  }
});
