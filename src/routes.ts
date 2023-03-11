import { Router } from "express";
import { Request, Response } from "express";
import { AcquisitionTypeController } from "./controllers/AcquisitionTypeController";
import { CategoryController } from "./controllers/CategoryController";
import { ItemController } from "./controllers/ItemController";
import { ItemStatusController } from "./controllers/ItemStatusController";
import { SubCategoryController } from "./controllers/SubCategoryController";
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
var itemController = new ItemController();
router.get("/item", Authenticate, itemController.readByUid);
router.post("/item", Authenticate, itemController.create);
router.get("/item/:id", Authenticate, itemController.readById);
router.put("/item/:id", Authenticate, itemController.update);
router.delete("/item/:id", Authenticate, itemController.delete);

//categories
router.get("/category", Authenticate, new CategoryController().read);
router.get("/category/:id", Authenticate, new CategoryController().readById);
router.post("/category", Authenticate, new CategoryController().create);

//sub categories
var subCategoryController = new SubCategoryController();
router.get("/subcategory", Authenticate, subCategoryController.read);
router.get("/subcategory/category/:id", Authenticate, subCategoryController.readByCategoryId);
router.post("/subcategory", Authenticate, subCategoryController.create);

//item status
router.get("/itemstatus", Authenticate, new ItemStatusController().readAll);

//acquisition types
router.get(
  "/acquisitiontypes",
  Authenticate,
  new AcquisitionTypeController().readAll
);

router.get("/imalive", (req, res) => res.json({ alive: "yes" }));

export { router };
