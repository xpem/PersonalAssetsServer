import { Conn } from "../keys";
import { IAcquisitionType } from "../models/AcquisitionType";
import { RowDataPacket } from "mysql2";

export class AcquisitionTypeService {
  readAll(uid: number): Promise<IAcquisitionType[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,system_default,sequence from acquisition_type  where ((uid = ?) or (uid is null and system_default = 1)) order by sequence",
        [uid],
        (err, res, fields) => {
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
                    SystemDefault: row.system_default,
                    Sequence: row.sequence,
                  };

                  objList.push(obj);
                }
              });
              resolve(objList);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  readById(id: number): Promise<IAcquisitionType | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,system_default,sequenc from acquisition_type where id = ?",
        [id],
        (err, res) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: IAcquisitionType = {
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
