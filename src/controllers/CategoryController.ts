import { CategoryService } from "../services/CategoryService";
import { Request, Response } from "express";
import { ICategory } from "../models/Category";
import { SubCategoryServive } from "../services/SubCategoryService";
const service = new CategoryService();

export class CategoryController {
  async read(req: Request, res: Response) {
    var uid = Number(req.uid);
    const itemList = await service.read(uid);
    return res.json(itemList);
  }
  async readById(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("Defina o id");
    }

    const id = req.params.id as string;
    const uid = Number(req.uid);

    const categoryResponse = await service.readById(Number(id), uid);

    if (categoryResponse) return res.json(categoryResponse);
    else return res.status(409).json("Esta categoria não existe");
  }
  async create(req: Request, res: Response) {
    const { Name, Color } = req.body;

    const category = {
      Name: Name ?? null,
      Color: Color ?? null,
    } as ICategory;

    //default color
    if (!category.Color) {
      category.Color = "3C3C3C";
    }

    category.Uid = Number(req.uid);

    if (await new CategoryController().ValidateItem(category)) {
      var categoryByName = await service.readByName(
        category.Name,
        category.Uid as number
      );
      if (categoryByName) {
        return res.status(409).json("Categoria já cadastrada com este nome");
      }

      const itemResponse = await service.create(category);
      return res.json(itemResponse);
    } else {
      return res.status(409).json("Campos name é obrigatório");
    }
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res.status(409).json("Defina um id");
    }

    const { Name, Color } = req.body;

    const category = {
      Name: Name ?? null,
      Color: Color ?? null,
      Id: Number(id),
    } as ICategory;

    //default color
    if (!category.Color) {
      category.Color = "3C3C3C";
    }

    category.Uid = Number(req.uid);
    var categoryController = new CategoryController();

    if (await categoryController.ValidateItem(category)) {
      var errorMessage = categoryController.ValidateById(
        category.Id as number,
        category.Uid as number
      );

      if (!errorMessage) {
        return errorMessage;
      }

      var categoryByName = await service.readByName(
        category.Name,
        category.Uid as number
      );

      if (categoryByName) {
        return res.status(409).json("Categoria já cadastrada com este nome");
      }

      const itemResponse = await service.update(category);
      return res.json(itemResponse);
    } else {
      return res.status(409).json("Campos name é obrigatório");
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res.status(409).json("Defina um id");
    }

    const Uid = Number(req.uid);
    var categoryController = new CategoryController();
    var errorMessage = categoryController.ValidadeDelete(Number(id), Uid);

    if (!errorMessage) {
      const service = new CategoryService();
      await service.delete(Number(id), Uid);

      return res.status(200);
    } else {
      return res.status(409).json(errorMessage);
    }
  }

  async ValidateById(id: number, uid: number) {
    //verify if this category exists in user
    var category = await service.readById(id, uid);

    if (!category) {
      return "Não existe categoria cadastrada para este usuário com este id";
    }

    return null;
  }
  async ValidadeDelete(id: number, uid: number) {

    var categoryController = new CategoryController();
    
    //verify if this category exists in user
    var errorMessage = categoryController.ValidateById(id, uid);

    if (!errorMessage) {
      return errorMessage;
    }

    const subcategoryService = new SubCategoryServive();

    var subcategories = await subcategoryService.readByCategoryId(uid, id);

    if (subcategories) {
      return "Existem categorias cadastradas nesta categoria";
    }

    return null;
  }

  async ValidateItem(category: ICategory) {
    if (!category.Name) {
      return false;
    }
    return true;
  }
}
