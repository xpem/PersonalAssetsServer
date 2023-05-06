import { Request, Response } from "express";
import { ISubCategory } from "../models/SubCategory";
import { SubCategoryServive } from "../services/SubCategoryService";

export class SubCategoryController {
  // async read(req: Request, res: Response) {
  //   var uid = Number(req.uid);
  //   const itemList = await new SubCategoryServive().read(uid);
  //   return res.json(itemList);
  // }
  async readById(req: Request, res: Response) {
    if (!req.params.id) throw new Error("Defina o id");

    const Id = req.params.id as string;
    var uid = Number(req.uid);

    const item = await new SubCategoryServive().readById(uid, Number(Id));
    return res.json(item);
  }
  async readByCategoryId(req: Request, res: Response) {
    if (!req.params.id) throw new Error("Defina o id");

    const uid = Number(req.uid);
    const categoryId = req.params.id as string;

    const itemList = await new SubCategoryServive().readByCategoryId(
      uid,
      Number(categoryId)
    );

    if (itemList) return res.json(itemList);
    else return res.status(204).json(null);
  }
  async create(req: Request, res: Response) {
    const { Name, IconName, Category } = req.body;

    const subCategory = {
      Name: Name ?? null,
      IconName: IconName ?? null,
      Category: { Id: Category.Id ?? null },
    } as ISubCategory;

    console.log(subCategory);
    //default color
    if (!subCategory.IconName) {
      subCategory.IconName = "Tag";
    }

    subCategory.Uid = Number(req.uid);

    if (await new SubCategoryController().ValidateParams(subCategory)) {
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

  async ValidateParams(subCategory: ISubCategory) {
    if (!subCategory.Name) return false;
    if (!subCategory.Category.Id) return false;
    return true;
  }
}
