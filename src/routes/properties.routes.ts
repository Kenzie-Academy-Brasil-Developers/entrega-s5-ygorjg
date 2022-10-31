import { Router } from "express";
import {
  propertiesCreateController,
  propertiesListController,
} from "../controllers/properties/properties.controller";
import { authUser } from "../middlewares/authUser.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  authUser,
  isAdminMiddleware,
  propertiesCreateController
);
propertiesRoutes.get("", propertiesListController);

export default propertiesRoutes;
