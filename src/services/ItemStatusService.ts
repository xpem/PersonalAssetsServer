import { Conn } from "../keys";
import { IItemStatus } from "../models/ItemStatus";
import { RowDataPacket } from "mysql2";

export class ItemStatusService {
  readAll(): Promise<IItemStatus[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query("select id,name from item_status", (err, res, fields) => {
        if (err) reject(err);
        else {
          const rows = <RowDataPacket[]>res;
          const itemStatusList: IItemStatus[] = [];
          if (rows) {
            rows.forEach((row) => {
              if (row) {
                const itemStatus: IItemStatus = {
                  Id: row.id,
                  Name: row.name,
                };

                itemStatusList.push(itemStatus);
              }
            });
            resolve(itemStatusList);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  readById(id: number): Promise<IItemStatus | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name from item_status where id = ?",
        [id],
        (err, res) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: IItemStatus = {
                Id: row.id,
                Name: row.name,
              };
              resolve(obj);
            } else {
              resolve(undefined);
            }
          }
        }
      );
    });
  }
}
