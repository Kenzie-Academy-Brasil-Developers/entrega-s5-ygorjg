import AppDataSource from "../../data-source";
import { Adress } from "../../entities/adresses.entity";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const propertiesCreateService = async (
  data: IPropertyRequest
): Promise<Property> => {
  const propertiesInfoRepository = AppDataSource.getRepository(Property);
  const adressInfoRepository = AppDataSource.getRepository(Adress);
  const categoryInfoRepository = AppDataSource.getRepository(Category);

  if (!data) {
    throw new AppError("Check the required fields");
  }
  const getCategory = await categoryInfoRepository.findOneBy({
    id: data.categoryId,
  });

  if (!getCategory) {
    throw new AppError("Category not found", 404);
  }
  const adressesExist = await adressInfoRepository.findOne({
    where: data.address,
  });

  if (adressesExist) {
    throw new AppError("Adresses already exists");
  }

  if (data.address.zipCode.length > 8) {
    throw new AppError("Invalid Zip Code!");
  }

  if (data.address.state.length > 2) {
    throw new AppError("Invalid State");
  }

  const newAdresses = adressInfoRepository.create(data.address);
  await adressInfoRepository.save(newAdresses);

  const newProperties = new Property();
  newProperties.value = data.value;
  newProperties.size = data.size;
  newProperties.address = newAdresses;
  newProperties.category = getCategory;

  propertiesInfoRepository.create(newProperties);
  await propertiesInfoRepository.save(newProperties);

  return newProperties;
};
export default propertiesCreateService;
