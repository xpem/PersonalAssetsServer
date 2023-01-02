import { AcquisitionTypeService } from "../services/AcquisitionTypeService";
import { Request, Response } from "express";

export class AcquisitionTypeController {
  async readAll(req: Request, res: Response) {
    const acquisitionTypeList = await (new AcquisitionTypeService()).readAll();
    return res.json(acquisitionTypeList);
  }
}
