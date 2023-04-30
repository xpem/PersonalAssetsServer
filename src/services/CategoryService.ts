import { Conn } from "../keys";
import { ICategory } from "../models/Category";
import { RowDataPacket } from "mysql2";
import { OkPacket } from "mysql2";

export class CategoryService {
  read(uid: number): Promise<ICategory[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,color,system_default from category where ((uid = ?) or (uid is null and system_default = 1))",
        [uid],
        (err, res, fields) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objList: ICategory[] = [];
            if (rows) {
              rows.forEach((row) => {
                if (row) {
                  const obj: ICategory = {
                    Id: row.id,
                    Name: row.name,
                    Color: row.color,
                    SystemDefault: row.system_default,
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
  readById(id: number, uid: number): Promise<ICategory | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,color,system_default from category where ((uid = ?) or (uid is null and system_default = 1)) and id = ?",
        [uid, id],
        (err, res, fields) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: ICategory = {
                Id: row.id,
                Name: row.name,
                Color: row.color,
                SystemDefault: row.system_default,
              };
              resolve(obj);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  readByName(name: string, uid: number): Promise<ICategory | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,color,system_default from category where ((uid = ?) or (uid is null and system_default = 1)) and name = ?",
        [uid, name],
        (err, res, fields) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: ICategory = {
                Id: row.id,
                Name: row.name,
                Color: row.color,
                SystemDefault: row.system_default,
              };
              resolve(obj);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  create(category: ICategory): Promise<ICategory> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "insert into category(name,color, system_default,uid) values (?,?,0,?)",
        [category.Name, category.Color, category.Uid],
        (err, res) => {
          if (err) reject(err);
          else
            this.readById(res.insertId, category.Uid as number)
              .then((category) => resolve(category!))
              .catch(reject);
        }
      );
    });
  }
  update(item: ICategory): Promise<ICategory> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "update category set name = ?,color = ? where id = ? and uid = ?",
        [item.Name, item.Color, item.Id, item.Uid],
        (err, res) => {
          if (err) reject(err);
          else
            this.readById(item.Id!, item.Uid!)
              .then((i) => resolve(i!))
              .catch(reject);
        }
      );
    });
  }
  delete(id: number, uid: number): Promise<void> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "delete from category where id = ? and uid = ?",
        [id, uid],
        (err, res) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
}

// create(category : ICategory) : Promise<ICategory>{
//   return new Promise((resolve,reject) =>{
//     Conn.query<OkPacket>(
//       "",[],(err,res) =>{}
//     );
//   })
// }
