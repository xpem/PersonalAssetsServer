import { Request, Response } from "express";
import { IItem } from "../models/Item";
import { ItemService } from "../services/ItemService";

export class ItemController {
  async create(req: Request, res: Response) {
    const {
      Name,
      TechnicalDescription,
      AcquisitionDate,
      PurchaseValue,
      PurchaseStore,
      ResaleValue,
      Status,
      Comment,
    } = req.body;

    const item = {
      Name: Name ?? null,
      TechnicalDescription: TechnicalDescription ?? null,
      AcquisitionDate: AcquisitionDate ?? null,
      PurchaseValue: PurchaseValue ?? null,
      PurchaseStore: PurchaseStore ?? null,
      ResaleValue: ResaleValue ?? null,
      Status: Status ?? null,
      Comment: Comment ?? null,
    } as IItem;

    // if(this.ValidateItem(item)){

    // }
  }
  async readById(req: Request, res: Response) {
    if (!req.params.id) {
      throw new Error("Defina o id");
    }

    const itemId = req.params.id as string;
    const uid = 6;

    const itemService = new ItemService();
    const itemResponse = await itemService.readById(Number(itemId));

    if (itemResponse) {
      return res.json(itemResponse);
    } else {
      return res.status(409).json("Não existe Item com este id");
    }
  }

  // ValidateItem(Item: IItem){
  //   if(!Item.Name){
  //       return false;
  //   }
  //   if(!Item.AcquisitionDate){
  //       return false;
  //   }
  //   if(!Item.Status){
  //       return false;
  //   }
  // }
}
