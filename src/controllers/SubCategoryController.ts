import { Request, Response } from "express";
import { ICategory } from "../models/Category";
import { ISubCategory } from "../models/SubCategory";
import { SubCategoryServive } from "../services/SubCategoryService";
import { CategoryController } from "./CategoryController";

export class SubCategoryController {
  async read(req: Request, res: Response) {
    var uid = Number(req.uid);
    const itemList = await new SubCategoryServive().read(uid);
    return res.json(itemList);
  }
  async readByCategoryId(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("Defina o id");
    }

    const uid = Number(req.uid);
    const categoryId = req.params.id as string;

    const itemList = await new SubCategoryServive().readByCategoryId(
      uid,
      Number(categoryId)
    );
    return res.json(itemList);
  }
  async create(req: Request, res: Response) {
    const { Name, Icon, Category } = req.body;

    console.log(Category);

    const subCategory = {
      Name: Name ?? null,
      Icon: Icon ?? null,
      Category: { Id: Category.Id ?? null },
    } as ISubCategory;

    //default color
    if (!subCategory.Icon) {
      subCategory.Icon = "uf02b";
    }

    subCategory.Uid = Number(req.uid);

    if (await new SubCategoryController().Validate(subCategory)) {
      const service = new SubCategoryServive();

      //
      var subCategoryByCategoryIdAndName =
        await service.readByCategoryIdAndName(
          subCategory.Uid,
          Number(subCategory.Category.Id),
          subCategory.Name
        );

      if (subCategoryByCategoryIdAndName) {
        return res
          .status(409)
          .json("Sub Categoria já cadastrada com este nome nesta categoria");
      }

      const itemResponse = await service.create(subCategory);
      return res.json(itemResponse);
    } else {
      return res.status(409).json("Campos name é obrigatório");
    }
  }

  async Validate(subCategory: ISubCategory) {
    if (!subCategory.Name) return false;
    if (!subCategory.Category.Id) return false;
    return true;
  }
}
