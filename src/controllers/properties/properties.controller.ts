import { Request, Response } from "express";
import propertiesCreateService from "../../services/properties/propertiesCreate.service";
import propertiesListService from "../../services/properties/propertiesList.service";

const propertiesCreateController = async (req: Request, res: Response) => {
  const data = req.body;
  const createdPropertiesInfo = await propertiesCreateService(data);

  return res.status(201).json(createdPropertiesInfo);
};

const propertiesListController = async (req: Request, res: Response) => {
  const properties = await propertiesListService();
  return res.json(properties);
};

export { propertiesCreateController, propertiesListController };
