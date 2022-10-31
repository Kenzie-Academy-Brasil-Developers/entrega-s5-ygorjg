import { NextFunction, Request, Response } from "express";

const isValidIDMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const email = req.user.email;
  if (!email) {
    return res.status(404).json({
      message: "Email not found",
    });
  }
  const id = req.user.id;

  if (!id) {
    return res.status(404).json({
      message: "Invalid id",
    });
  }

  return next();
};
export default isValidIDMiddleware;
