import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const userLoginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.findOneBy({ email });

  if (!users) {
    throw new AppError("Account not found");
  }
  if (!users.password) {
    throw new AppError("Password not found", 401)
  }

  if (!bcrypt.compareSync(password, users.password)) {
    throw new AppError("Wrong email/password", 403);
  }

  const token = jwt.sign({ email: email }, String(process.env.SECRET_KEY), {
    expiresIn: "24h",
    subject: users.id,
  });

  return token;
};

export default userLoginService;
