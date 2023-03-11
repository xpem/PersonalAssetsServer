import { CategoryService } from "../services/CategoryService";
import { Request, Response } from "express";
import { ICategory } from "../models/Category";

export class CategoryController {
  async read(req: Request, res: Response) {
    var uid = Number(req.uid);
    const itemList = await new CategoryService().read(uid);
    return res.json(itemList);
  }
  async readById(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("Defina o id");
    }

    const id = req.params.id as string;
    const uid = Number(req.uid);

    const categoryService = new CategoryService();
    const categoryResponse = await categoryService.readById(Number(id), uid);

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
      const service = new CategoryService();

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

  async ValidateItem(category: ICategory) {
    if (!category.Name) {
      return false;
    }
    return true;
  }
}
