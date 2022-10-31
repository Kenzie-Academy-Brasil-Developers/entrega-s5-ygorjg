import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const isAccountExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOneBy({ id });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return next();
};

export default isAccountExistsMiddleware;
