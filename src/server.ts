import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import "express-async-errors";
import path from "path";
import { router } from "./routes";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//unico modulo que encontrei que funciona no king host.
//o ideal seria o multer, mas neste caso, não funcionou,
// talvez se um dia atualizarem o node para > 10, quem sabe
// var multiparty = require("connect-multiparty");

// app.use(multiparty({ uploadDir: path.resolve(__dirname, "../..", "Files/InventoryImages") }));
// app.use(
//   "/images",
//   express.static(path.resolve(__dirname, "../..", "Files/InventoryImages"))
// );

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

app.listen(process.env.PORT_BOOKSHELFSERVER_SERVER || 3001, () =>
  console.log(`Server onLine`)
);
