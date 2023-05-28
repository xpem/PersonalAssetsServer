import { AcquisitionTypeService } from "../services/AcquisitionTypeService";
import { Request, Response } from "express";

export class AcquisitionTypeController {
  async readAll(req: Request, res: Response) {
    var uid = Number(req.uid);
    const acquisitionTypeList = await new AcquisitionTypeService().readAll(uid);
    return res.json(acquisitionTypeList);
  }
}
