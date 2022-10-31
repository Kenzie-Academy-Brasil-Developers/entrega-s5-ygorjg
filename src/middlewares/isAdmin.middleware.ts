import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.user.email;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!user.isAdm) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  return next();
};

export default isAdminMiddleware;
