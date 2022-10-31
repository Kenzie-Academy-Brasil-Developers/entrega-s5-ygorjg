import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import userLoginService from "../../services/session/userSession.service";

const userLoginController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;
  const token = await userLoginService({ email, password });
  return res.json({ token });
};

export default userLoginController;
