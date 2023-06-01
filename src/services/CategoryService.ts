import { Conn } from "../keys";
import { ICategory } from "../models/Category";
import { RowDataPacket } from "mysql2";
import { OkPacket } from "mysql2";
import { SubCategoryServive } from "./SubCategoryService";

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
                    SubCategories: [],
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
  readWithSubCategories(uid: number): Promise<ICategory[] | null> {
    return new Promise((resolve, reject) => {
      console.log("teste");
      console.log(uid);
      Conn.query(
        "select c.id as c_id,c.name as c_name,c.color as c_color,c.system_default as c_system_default,sc.id as sc_id,sc.name as sc_name,sc.icon_name as sc_icon,c.system_default as sc_system_default from category c left join sub_category sc on c.id = sc.category_id where ((c.uid = ?) or (c.uid is null and c.system_default = 1)) order by c.id",
        [uid],
        (err, res, fields) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objList: ICategory[] = [];
            if (rows) {
              var counter = 0;
              rows.forEach((row) => {
                if (row) {
                  var obj: ICategory;
                  console.log("counter " + counter);

                  if (
                    counter > 0 &&
                    objList.length > 0 &&
                    row.sc_id &&
                    objList[objList.length - 1].Id == row.c_id
                  ) {
                    if (row.sc_id) {
                      objList[objList.length - 1].SubCategories?.push({
                        Id: row.sc_id,
                        IconName: row.sc_icon,
                        Name: row.sc_name,
                        SystemDefault: row.sc_system_default,
                        CategoryId: row.c_id,
                      });
                    }
                  } else {
                    obj = {
                      Id: row.c_id,
                      Name: row.c_name,
                      Color: row.c_color,
                      SystemDefault: row.c_system_default,
                      SubCategories: [],
                    };

                    if (row.sc_id) {
                      obj.SubCategories?.push({
                        Id: row.sc_id,
                        IconName: row.sc_icon,
                        Name: row.sc_name,
                        SystemDefault: row.sc_system_default,
                        CategoryId: row.c_id,
                        // Category: {
                        //   Id: row.c_id,
                        //   Name: row.c_name,
                        //   Color: row.c_color,
                        //   SystemDefault: row.c_system_default,
                        //   SubCategories: null,
                        // },
                      });
                    }

                    objList.push(obj);
                  }
                  counter++;
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
                SubCategories: [],
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
                SubCategories: [],
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
        "insert into category(name,color,system_default,uid,updated_at) values (?,?,0,?,now())",
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
        "update category set name = ?,color = ?, updated_at = now() where id = ? and uid = ?",
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
