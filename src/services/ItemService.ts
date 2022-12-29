import { OkPacket } from "mysql2";
import { RowDataPacket } from "mysql2";
import { Conn } from "../keys";
import { IItem } from "../models/Item";

export class ItemService {
  // create(item: IItem): Promise<IItem> {
  //   return new Promise((resolve, reject) => {
  //     Conn.query<OkPacket>(
  //       "insert into itens(uid,name,technical_description,acquisition_date,purchase_value,purchase_store,status_id,acquisition_type_id)" +
  //         " values ('?',?,?,?,?,?,?,?)",
  //       [
  //         item.Uid,
  //         item.Name,
  //         item.TechnicalDescription,
  //         item.AcquisitionDate,
  //         item.PurchaseValue,
  //         item.PurchaseStore,
  //         item.Status,
  //         item.AquisitionType,
  //       ],
  //       (err, res) => {
  //         if (err) reject(err);
  //         else
  //           this.readById(res.insertId)
  //             .then((book) => resolve(book!))
  //             .catch(reject);
  //       }
  //     );
  //   });
  // }
  readById(itemId: number): Promise<IItem | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,technical_description,acquisition_date,purchase_value,purchase_store, " +
          "resale_value,status_id,comment,created_at,updated_at,acquisition_type_id from itens where id = ?",
        [itemId],
        (err, res) => {
          if (err) reject(err);
          else {
        
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const item: IItem = {
                Id: row.id,
                Name: row.name,
                TechnicalDescription: row.technical_description,
                AcquisitionDate: row.acquisition_date,
                AcquisitionType: row.acquisition_type_id,
                PurchaseStore: row.purchase_store,
                PurchaseValue: row.purchase_value,
                ResaleValue: row.resale_value,
                CreatedAt: row.created_at,
                UpdatedAt: row.updated_at,
                Comment: row.comment,
                Status: row.status_id,
              };
              console.log(item);
              resolve(item);
            } else {
              resolve(undefined);
            }
          }
        }
      );
    });
  }
}
