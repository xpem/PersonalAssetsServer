import { Request, Response } from "express";
import { IItem } from "../models/Item";
import { AcquisitionTypeService } from "../services/AcquisitionTypeService";
import { ItemService } from "../services/ItemService";
import { ItemSituationService } from "../services/ItemSituationService";

export class ItemController {
  async create(req: Request, res: Response) {
    const {
      Name,
      TechnicalDescription,
      AcquisitionDate,
      PurchaseValue,
      PurchaseStore,
      ResaleValue,
      Situation,
      Comment,
      AcquisitionType,
    } = req.body;

    const item = {
      Name: Name ?? null,
      TechnicalDescription: TechnicalDescription ?? null,
      AcquisitionDate: AcquisitionDate ?? null,
      PurchaseValue: PurchaseValue ?? null,
      PurchaseStore: PurchaseStore ?? null,
      ResaleValue: ResaleValue ?? null,
      Situation: Situation ?? null,
      Comment: Comment ?? null,
      AcquisitionType: AcquisitionType ?? null,
    } as IItem;

    item.Uid = Number(req.uid);

    if (await new ItemController().ValidateItem(item)) {
      const itemService = new ItemService();
      const itemResponse = await itemService.create(item);
      return res.json(itemResponse);
    } else {
      return res
        .status(409)
        .json(
          "Campos Name, AcquititionDate, Status e AcquisitionType são obrigatórios"
        );
    }
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res.status(409).json("Defina um id");
    }

    const {
      Name,
      TechnicalDescription,
      AcquisitionDate,
      PurchaseValue,
      PurchaseStore,
      ResaleValue,
      Situation,
      Comment,
      AcquisitionType,
    } = req.body;

    const item = {
      Name: Name ?? null,
      TechnicalDescription: TechnicalDescription ?? null,
      AcquisitionDate: AcquisitionDate ?? null,
      PurchaseValue: PurchaseValue ?? null,
      PurchaseStore: PurchaseStore ?? null,
      ResaleValue: ResaleValue ?? null,
      Situation: Situation ?? null,
      Comment: Comment ?? null,
      AcquisitionType: AcquisitionType ?? null,
      Id: Number(id),
    } as IItem;

    item.Uid = Number(req.uid);

    if (await new ItemController().ValidateItem(item)) {
      const itemService = new ItemService();
      const itemResponse = await itemService.update(item);
      return res.json(itemResponse);
    } else {
      return res
        .status(409)
        .json(
          "Campos Name, AcquititionDate, Status e AcquisitionType são obrigatórios"
        );
    }
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res.status(409).json("Defina um id");
    }

    const Uid = Number(req.uid);

    const itemService = new ItemService();
    await itemService.delete(Number(id), Uid);
    return res.status(200);
  }
  async readById(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("Defina o id");
    }

    const itemId = req.params.id as string;
    const uid = Number(req.uid);

    const itemService = new ItemService();
    const itemResponse = await itemService.readById(Number(itemId), uid);

    if (itemResponse) {
      return res.json(itemResponse);
    } else {
      return res.status(409).json("Não existe Item com este id");
    }
  }
  async readByUid(req: Request, res: Response) {
    const uid = Number(req.uid);

    const itemResponse = await new ItemService().readByUid(Number(uid));
    if (itemResponse) {
      return res.json(itemResponse);
    } else {
      return res.status(409).json("Não existe Items para este usuário");
    }
  }
  async ValidateItem(Item: IItem) {
    if (!Item.Name) {
      return false;
    }
    if (!Item.AcquisitionDate) {
      return false;
    }

    if (!Item.Situation) {
      const itemstatus = await new ItemSituationService().readById(
        Number(Item.Situation)
      );
      if (!itemstatus) return false;
    }
    if (!Item.AcquisitionType) {
      const acquisitionType = await new AcquisitionTypeService().readById(
        Number(Item.AcquisitionType)
      );

      if (!acquisitionType) return false;
    }

    return true;
  }
}
