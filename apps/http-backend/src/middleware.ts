import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

// Extend the Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function middleware(req: Request, res: Response, next: NextFunction) {
   const token = req.headers["authorization"] ?? "";

   try {
     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
     
     if(decoded && decoded.userId){
       req.userId = decoded.userId;
       next()
     } else {
       res.status(403).json({message:" not authorized"})
     }
   } catch (error) {
     res.status(403).json({message:"not authorized "})
   }
}   