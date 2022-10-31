import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Schedules_user_propertie } from "../../entities/schedules_user_properties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const schedulesCreateService = async (
  data: IScheduleRequest,
  userId: string
): Promise<Schedules_user_propertie> => {
  const schedulesInfoRepository = AppDataSource.getRepository(
    Schedules_user_propertie
  );
  const usersInfoRepository = AppDataSource.getRepository(User);
  const propertiesInfoRepository = AppDataSource.getRepository(Property);

  if (!data) {
    throw new AppError("Check the required fields");
  }

  const getUser = await usersInfoRepository.findOneBy({
    id: userId,
  });

  if (!getUser) {
    throw new AppError("Not found", 404);
  }

  const getDay = new Date(data.date).getDay();
  if (getDay === 0 || getDay === 6) {
    throw new AppError("Schedule on weekdays");
  }

  const getProperty = await propertiesInfoRepository.findOneBy({
    id: data.propertyId,
  });

  if (!getProperty) {
    throw new AppError("Schedule not found", 404);
  }

  const schedule = await schedulesInfoRepository.findOne({
    where: {
      date: data.date,
      hour: data.hour
    }
  });

  const hourNumber = parseInt(data.hour)


  if (hourNumber < 8 || hourNumber >= 18) {
    throw new AppError("Schedule during business hours");
  }

  if (schedule) {
    throw new AppError("Schedule already exists");
  }

  const newSchedules = new Schedules_user_propertie();
  newSchedules.date = data.date;
  newSchedules.hour = data.hour;
  newSchedules.properties = getProperty;
  newSchedules.user = getUser;

  const createSchedule = schedulesInfoRepository.create(newSchedules);
  await schedulesInfoRepository.save(createSchedule);

  return createSchedule;
};
export default schedulesCreateService;
