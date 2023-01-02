import { ItemStatusService } from "../services/ItemStatusService";
import { Request, Response } from "express";

export class ItemStatusController {
  async readAll(req: Request, res: Response) {
    const itemStatusList = await (new ItemStatusService()).readAll();
    return res.json(itemStatusList);
  }
}
