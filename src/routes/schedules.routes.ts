import { Router } from "express";
import {
  schedulesCreateController,
  schedulesListController,
} from "../controllers/schedules/schedules.controller";
import { authUser } from "../middlewares/authUser.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", authUser, schedulesCreateController);
schedulesRoutes.get(
  "/properties/:id",
  authUser,
  isAdminMiddleware,
  schedulesListController
);

export default schedulesRoutes;
