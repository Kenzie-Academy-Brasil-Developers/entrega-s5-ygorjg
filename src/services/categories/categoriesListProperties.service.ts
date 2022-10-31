import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

const categoriesListProperties = async (id: string): Promise<Category> => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        properties: true,
      },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  } catch (error) {
    throw new AppError("ID Invalid", 404);
  }
};
export default categoriesListProperties;
