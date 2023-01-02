import { Conn } from "../keys";
import { IAcquisitionType } from "../models/AcquisitionType";
import { RowDataPacket } from "mysql2";

export class AcquisitionTypeService {
  readAll(): Promise<IAcquisitionType[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query("select id,name from acquisition_type", (err, res, fields) => {
        if (err) reject(err);
        else {
          const rows = <RowDataPacket[]>res;
          const objList: IAcquisitionType[] = [];
          if (rows) {
            rows.forEach((row) => {
              if (row) {
                const obj: IAcquisitionType = {
                  Id: row.id,
                  Name: row.name,
                };

                objList.push(obj);
              }
            });
            resolve(objList);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  readById(id: number): Promise<IAcquisitionType | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name from acquisition_type where id = ?",
        [id],
        (err, res) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: IAcquisitionType = {
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
