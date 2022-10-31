import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userUpdateService = async (
  dataUser: Partial<User>,
  id: string
): Promise<Array<object | number>> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);
  const data = Object.keys(dataUser);
  if (
    data.includes("isAdm") ||
    data.includes("isActive") ||
    data.includes("id")
  ) {
    throw new AppError("Not Possible update isAdm, isActive or ID", 401);
  }

  await userRepository.update(account!.id, {
    ...account,
    ...dataUser,
    updatedAt: new Date(),
  });

  return [{ message: "Updated!" }, 200];
};
export default userUpdateService;
