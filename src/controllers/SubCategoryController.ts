import { Request, Response } from "express";
import { ISubCategory } from "../models/SubCategory";
import { SubCategoryServive } from "../services/SubCategoryService";
const service = new SubCategoryServive();

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

    console.log(Id);
    console.log(uid);

    const item = await service.readById(Number(Id), uid);
    return res.json(item);
  }
  async readByCategoryId(req: Request, res: Response) {
    if (!req.params.id) throw new Error("Defina o id");

    const uid = Number(req.uid);
    const categoryId = req.params.id as string;

    const itemList = await service.readByCategoryId(uid, Number(categoryId));

    if (itemList) return res.json(itemList);
    else return res.status(204).json(null);
  }
  async create(req: Request, res: Response) {
    const { Name, IconName, CategoryId } = req.body;

    const subCategory = {
      Name: Name ?? null,
      IconName: IconName ?? null,
      CategoryId: CategoryId,
    } as ISubCategory;

    //default color
    if (!subCategory.IconName) subCategory.IconName = "Tag";

    subCategory.Uid = Number(req.uid);

    if (await new SubCategoryController().ValidateParams(subCategory)) {
      //
      var subCategoryByCategoryIdAndName =
        await service.readByCategoryIdAndName(
          subCategory.Uid,
          Number(subCategory.CategoryId),
          subCategory.Name
        );

      if (subCategoryByCategoryIdAndName)
        return res
          .status(409)
          .json("Sub Categoria já cadastrada com este nome nesta categoria");

      const itemResponse = await service.create(subCategory);
      return res.json(itemResponse);
    } else return res.status(409).json("Campos name é obrigatório");
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) return res.status(409).json("Defina um id");

    const { Name, IconName } = req.body;

    const subCategory = {
      Name: Name ?? null,
      IconName: IconName ?? null,
      Id: Number(id),
    } as ISubCategory;

    //default color
    if (!subCategory.IconName) subCategory.IconName = "Tag";

    subCategory.Uid = Number(req.uid);

    if (!subCategory.Name)
      return res.status(409).json("Campos name é obrigatório");

    var _subCategory = await service.readById(
      subCategory.Id as number,
      subCategory.Uid
    );

    if (!_subCategory)
      return "Não existe sub categoria cadastrada para este usuário com este id";

    subCategory.CategoryId = _subCategory.CategoryId;

    var subCategoryByName = await service.readByCategoryIdAndName(
      subCategory.Uid as number,
      subCategory.CategoryId as number,
      subCategory.Name
    );

    if (subCategoryByName && subCategoryByName.Id != subCategoryByName.Id) {
      return res.status(409).json("Sub Categoria já cadastrada com este nome");
    }

    const itemResponse = await service.update(subCategory);
    return res.json(itemResponse);
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res.status(409).json("Defina um id");
    }

    const Uid = Number(req.uid);
    var errorMessage = await new SubCategoryController().ValidateDelete(
      Number(id),
      Uid
    );

    if (!errorMessage) {
      await service.delete(Number(id), Uid);

      return res.status(200).json("Sub Categoria excluída.");
    } else return res.status(409).json(errorMessage);
  }
  async ValidateParams(subCategory: ISubCategory) {
    if (!subCategory.Name) return false;
    if (!subCategory.CategoryId) return false;
    return true;
  }
  async ValidateById(id: number, uid: number) {
    //verify if this category exists in user
    var subCategory = await service.readById(id, uid);

    if (!subCategory)
      return "Não existe sub categoria cadastrada para este usuário com este id";

    return null;
  }
  async ValidateByCategoryIdAndName(
    categoryId: number,
    uid: number,
    name: string
  ) {
    //verify if this category exists in user
    var subCategory = await service.readByCategoryIdAndName(
      uid,
      categoryId,
      name
    );

    if (!subCategory)
      return "Não existe subcategoria cadastrada para este usuário com este id";

    return null;
  }
  async ValidateDelete(id: number, uid: number) {
    //verify if this category exists in user
    var errorMessage = await new SubCategoryController().ValidateById(id, uid);

    if (errorMessage) return errorMessage;

    // if (Items) {
    //   return "Existem Items cadastrados nesta sub categoria";
    // }

    return null;
  }
}
