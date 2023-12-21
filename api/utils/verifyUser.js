import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, "Unauthorized"));

    jwt.verify(token, process.env.JWT, (error, user)=>{
        if(error) return next(errorHandler(403, 'Forbidben'));

        req.user = user;
        next()
    });
};