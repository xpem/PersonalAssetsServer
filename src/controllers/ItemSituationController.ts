import { ItemSituationService } from "../services/ItemSituationService";
import { Request, Response } from "express";

export class ItemSituationController {
  async readAll(req: Request, res: Response) {
    var uid = Number(req.uid);
    const itemSituationList = await (new ItemSituationService()).readAll(uid);
    return res.json(itemSituationList);
  }
}
