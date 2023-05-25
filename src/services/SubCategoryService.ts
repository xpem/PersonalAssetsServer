import { OkPacket, RowDataPacket } from "mysql2";
import { Conn } from "../keys";
import { ISubCategory } from "../models/SubCategory";

export class SubCategoryServive {
  QueryCategoryWithSubCategories: string =
    "select id, name, icon_name, system_default, category_id from sub_category";
  // read(uid: number): Promise<ISubCategory[] | null> {
  //   return new Promise((resolve, reject) => {
  //     Conn.query(
  //       "select c.id as c_id,c.name as c_name,c.color as c_color,c.system_default as c_system_default,sc.id as sc_id,sc.name as sc_name,sc.icon_name as sc_icon,c.system_default as sc_system_default from category c inner join sub_category sc on c.id = sc.category_id where (sc.uid = ?) or (sc.uid is null and sc.system_default = 1)",
  //       [uid],
  //       (err, res) => {
  //         if (err) reject(err);
  //         else {
  //           const rows = <RowDataPacket[]>res;
  //           const objList: ISubCategory[] = [];
  //           if (rows) {
  //             rows.forEach((row) => {
  //               if (row) {
  //                 const obj: ISubCategory = {
  //                   Id: row.sc_id,
  //                   IconName: row.sc_icon,
  //                   Name: row.sc_name,
  //                   SystemDefault: row.sc_system_default,
  //                   Category: {
  //                     Id: row.c_id,
  //                     Name: row.c_name,
  //                     Color: row.c_color,
  //                     SystemDefault: row.c_system_default,
  //                   },
  //                 };
  //                 objList.push(obj);
  //               }
  //             });
  //             resolve(objList);
  //           } else {
  //             resolve(null);
  //           }
  //         }
  //       }
  //     );
  //   });
  // },
  readByCategoryId(
    uid: number,
    categoryId: number
  ): Promise<ISubCategory[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        this.QueryCategoryWithSubCategories +
          " where ((uid = ?) or (uid is null and system_default = 1)) and category_id = ?",
        [uid, categoryId],
        (err, res) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objList: ISubCategory[] = [];

            if (rows.length > 0) {
              rows.forEach((row) => {
                if (row) {
                  const obj: ISubCategory = {
                    Id: row.id,
                    IconName: row.icon_name,
                    Name: row.name,
                    SystemDefault: row.system_default,
                    CategoryId: row.category_id,
                  };
                  objList.push(obj);
                }
              });
              resolve(objList);
            } else resolve(null);
          }
        }
      );
    });
  }
  readById(id: number, uid: number): Promise<ISubCategory | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        this.QueryCategoryWithSubCategories +
          " where ((uid = ?) or (uid is null and system_default = 1)) and id = ?",
        [uid, id],
        (err, res) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: ISubCategory = {
                Id: row.id,
                IconName: row.icon_name,
                Name: row.name,
                SystemDefault: row.system_default,
                CategoryId: row.category_id,
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
  readByCategoryIdAndName(
    uid: number,
    categoryId: number,
    name: string
  ): Promise<ISubCategory | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        this.QueryCategoryWithSubCategories +
          " where ((uid = ?) or (uid is null and system_default = 1)) and category_id = ? and name = ?",
        [uid, categoryId, name],
        (err, res) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const obj: ISubCategory = {
                Id: row.id,
                IconName: row.icon_name,
                Name: row.name,
                SystemDefault: row.system_default,
                CategoryId: row.category_id,
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
  create(subCategory: ISubCategory): Promise<ISubCategory> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "insert into sub_category(name,icon_name,system_default,category_id,uid,updated_at) values (?,?,0,?,?,now())",
        [
          subCategory.Name,
          subCategory.IconName,
          subCategory.CategoryId,
          subCategory.Uid,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.readById(res.insertId, subCategory.Uid as number)
              .then((x) => resolve(x!))
              .catch(reject);
        }
      );
    });
  }
  update(item: ISubCategory): Promise<ISubCategory> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "update sub_category set name = ?,icon_name = ?,updated_at = now() where id = ? and uid = ?",
        [item.Name, item.IconName, item.Id, item.Uid],
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
        "delete from sub_category where id = ? and uid = ?",
        [id, uid],
        (err, res) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
}
