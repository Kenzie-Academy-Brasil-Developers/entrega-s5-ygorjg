import { Router } from "express";
import {
  userCreateController,
  userDeleteController,
  userListController,
  userUpdateController,
} from "../controllers/user/user.controller";
import { authUser } from "../middlewares/authUser.middleware";
import isAccountExistsMiddleware from "../middlewares/isAccountExists.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";
import isAdminUpdateMiddleware from "../middlewares/isAdminUpdate.middleware";
import isValidIDMiddleware from "../middlewares/isValidID.middleware";

const userRoutes = Router();

userRoutes.post("", userCreateController);
userRoutes.get("", authUser, isAdminMiddleware, userListController);
userRoutes.delete(
  "/:id",
  authUser,
  isValidIDMiddleware,
  isAdminMiddleware,
  isAccountExistsMiddleware,
  userDeleteController
);
userRoutes.patch(
  "/:id",
  authUser,
  isAdminUpdateMiddleware,
  isAccountExistsMiddleware,
  userUpdateController
);

export default userRoutes;
