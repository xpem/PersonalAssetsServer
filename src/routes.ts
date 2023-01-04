import { Router } from "express";
import { Request, Response } from "express";
import { AcquisitionTypeController } from "./controllers/AcquisitionTypeController";
import { ItemController } from "./controllers/ItemController";
import { ItemStatusController } from "./controllers/ItemStatusController";
import { Authenticate } from "./middleware/Authenticate";

const router = Router();

//para tratar o caso de upload de arquivo
// interface multipartyRequest extends Request {
//   file: any;
// }

// router.post("/upload", multipartyMiddleware, (req: Request, res: Response) => {

//   console.log(req.body, (req as multipartyRequest).files);

//   res.json((req as multipartyRequest).files.imga);
// });

//items
router.get("/item", Authenticate, new ItemController().readByUid);
router.post("/item", Authenticate, new ItemController().create);
router.get("/item/:id", Authenticate, new ItemController().readById);
router.put("/item/:id", Authenticate, new ItemController().update);
router.delete("/item/:id", Authenticate, new ItemController().delete);

router.get("/imalive", (req, res) => res.json({ alive: "yes" }));

//item status
router.get("/itemstatus", Authenticate, new ItemStatusController().readAll);

//acquisition types
router.get(
  "/acquisitiontypes",
  Authenticate,
  new AcquisitionTypeController().readAll
);

export { router };
