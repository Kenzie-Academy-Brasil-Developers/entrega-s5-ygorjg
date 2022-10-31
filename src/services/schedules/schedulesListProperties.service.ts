import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const schedulesListServiceProperty = async (id: string): Promise<Property> => {
  try {
    const propertyListRepository = AppDataSource.getRepository(Property);

    const property = await propertyListRepository.findOne({
      where: {
        id,
      },
      relations: {
        schedules: true,
      },
    });
    if (!property) {
      throw new AppError("Property not found", 404);
    }

    return property;
  } catch (error) {
    throw new AppError("ID Invalid", 404);
  }
};
export default schedulesListServiceProperty;
