import { Conn } from "../keys";
import { IItemSituation } from "../models/ItemSituation";
import { RowDataPacket } from "mysql2";

export class ItemSituationService {
  readAll(uid: number): Promise<IItemSituation[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,system_default,sequence from item_situation where ((uid = ?) or (uid is null and system_default = 1)) order by sequence",
        [uid],
        (err, res, fields) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const list: IItemSituation[] = [];
            if (rows) {
              rows.forEach((row) => {
                if (row) {
                  const itemSituation: IItemSituation = {
                    Id: row.id,
                    Name: row.name,
                    SystemDefault: row.system_default,
                    Sequence: row.sequence,
                  };

                  list.push(itemSituation);
                }
              });
              resolve(list);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  readById(id: number): Promise<IItemSituation | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,system_default,sequence from item_situation where id = ?",
        [id],
        (err, res) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: IItemSituation = {
                Id: row.id,
                Name: row.name,
                SystemDefault: row.system_default,
                Sequence: row.sequence,
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
