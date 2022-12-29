import { Router } from "express";
import { Request, Response } from "express";
import { ItemController } from "./controllers/ItemController";

const router = Router();

//para tratar o caso de upload de arquivo
// interface multipartyRequest extends Request {
//   file: any;
// }

// router.post("/upload", multipartyMiddleware, (req: Request, res: Response) => {

//   console.log(req.body, (req as multipartyRequest).files);

//   res.json((req as multipartyRequest).files.imga);
// });

router.get("/item/:id", new ItemController().readById);

export { router };
