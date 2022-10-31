import { Request, Response } from "express";
import categorieCreateService from "../../services/categories/categorieCreate.service";
import categorieListService from "../../services/categories/categorieList.service";
import categoriesListProperties from "../../services/categories/categoriesListProperties.service";

const createCategoriesController = async (req: Request, res: Response) => {
  const name = req.body.name;
  const createdCategory = await categorieCreateService(name);
  return res.status(201).json(createdCategory);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await categorieListService();
  return res.json(categories);
};

const categoriesListPropertiesController = async (
  req: Request,
  res: Response
) => {
  const {id} = req.params

  const categories = await categoriesListProperties(id);
  return res.json(categories);
};

export {
  createCategoriesController,
  listCategoriesController,
  categoriesListPropertiesController,
};
