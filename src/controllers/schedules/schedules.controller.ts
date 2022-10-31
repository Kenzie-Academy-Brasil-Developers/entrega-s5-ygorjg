import { Request, Response } from "express";
import schedulesCreateService from "../../services/schedules/schedulesCreate.service";
import schedulesListServiceProperty from "../../services/schedules/schedulesListProperties.service";

const schedulesCreateController = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user.id;
  const createdSchedulesInfo = await schedulesCreateService(data, userId);

  return res
    .status(201)
    .json({ message: "Schedule created", schedules: createdSchedulesInfo });
};

const schedulesListController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedules = await schedulesListServiceProperty(id);
  return res.json(schedules);
};

export { schedulesCreateController, schedulesListController };
