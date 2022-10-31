import { Router } from "express";
import {
  categoriesListPropertiesController,
  createCategoriesController,
  listCategoriesController,
} from "../controllers/categories/categories.controller";
import { authUser } from "../middlewares/authUser.middleware";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";

const categoriesRouter = Router();

categoriesRouter.post(
  "",
  authUser,
  isAdminMiddleware,
  createCategoriesController
);

categoriesRouter.get("", listCategoriesController);
categoriesRouter.get("/:id/properties", categoriesListPropertiesController);

export default categoriesRouter;
