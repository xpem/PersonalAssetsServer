import { Router } from "express";
import { Request, Response } from "express";
import { AcquisitionTypeController } from "./controllers/AcquisitionTypeController";
import { CategoryController } from "./controllers/CategoryController";
import { ItemController } from "./controllers/ItemController";
import { ItemSituationController } from "./controllers/ItemSituationController";
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
var categoryController = new CategoryController();
router.get("/category", Authenticate, categoryController.read);

//aviso: a ordem dos gets afeta a leitura das variaveis.
router.get("/category/subcategories", Authenticate, categoryController.readWithSubCategories);
router.get("/category/:id", Authenticate, categoryController.readById);
//

router.post("/category", Authenticate, categoryController.create);
router.put("/category/:id", Authenticate, categoryController.update);
router.delete("/category/:id", Authenticate, categoryController.delete);

//sub categories
var subCategoryController = new SubCategoryController();
// router.get("/subcategory", Authenticate, subCategoryController.read);
router.get(
  "/subcategory/category/:id",
  Authenticate,
  subCategoryController.readByCategoryId
);
router.get("/subcategory/:id", Authenticate, subCategoryController.readById);
router.post("/subcategory", Authenticate, subCategoryController.create);
router.put("/subcategory/:id", Authenticate, subCategoryController.update);
router.delete("/subcategory/:id", Authenticate, subCategoryController.delete);

//item situation
router.get("/itemsituation", Authenticate, new ItemSituationController().readAll);

//acquisition types
router.get(
  "/acquisitiontypes",
  Authenticate,
  new AcquisitionTypeController().readAll
);

router.get("/imalive", (req, res) => res.json({ alive: "yes" }));

export { router };
