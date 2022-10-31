import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const categorieCreateService = async (
  name: string
): Promise<ICategoryRequest> => {
  const categorieRepository = AppDataSource.getRepository(Category);
  const sameCategory = await categorieRepository.findOneBy({ name });

  if (sameCategory) {
    throw new AppError("Category already exists");
  }

  const categorie = categorieRepository.create({
    name,
  });

  await categorieRepository.save(categorie);

  return categorie;
};

export default categorieCreateService;
