import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    return jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          return res.status(401).json({
            message: "Invalid token",
          });
        }
        req.user = {
          email: decoded.email,
          id: decoded.sub,
        };
        return next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
