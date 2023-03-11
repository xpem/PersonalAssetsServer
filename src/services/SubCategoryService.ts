import { OkPacket, RowDataPacket } from "mysql2";
import { Conn } from "../keys";
import { ISubCategory } from "../models/SubCategory";

export class SubCategoryServive {
  read(uid: number): Promise<ISubCategory[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select c.id as c_id,c.name as c_name,c.color as c_color,c.system_default as c_system_default,sc.id as sc_id,sc.name as sc_name,sc.icon as sc_icon,c.system_default as sc_system_default from category c inner join sub_category sc on c.id = sc.category_id where (sc.uid = ?) or (sc.uid is null and sc.system_default = 1)",
        [uid],
        (err, res) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objList: ISubCategory[] = [];
            if (rows) {
              rows.forEach((row) => {
                if (row) {
                  const obj: ISubCategory = {
                    Id: row.sc_id,
                    Icon: row.sc_icon,
                    Name: row.sc_name,
                    SystemDefault: row.sc_system_default,
                    Category: {
                      Id: row.c_id,
                      Name: row.c_name,
                      Color: row.c_color,
                      SystemDefault: row.c_system_default,
                    },
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
  readByCategoryId(uid: number,categoryId: number): Promise<ISubCategory[] | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select c.id as c_id,c.name as c_name,c.color as c_color,c.system_default as c_system_default,sc.id as sc_id,sc.name as sc_name,sc.icon as sc_icon,c.system_default as sc_system_default from category c inner join sub_category sc on c.id = sc.category_id where ((sc.uid = ?) or (sc.uid is null and sc.system_default = 1)) and sc.category_id = ?",
        [uid,categoryId],
        (err, res) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objList: ISubCategory[] = [];
            if (rows) {
              rows.forEach((row) => {
                if (row) {
                  const obj: ISubCategory = {
                    Id: row.sc_id,
                    Icon: row.sc_icon,
                    Name: row.sc_name,
                    SystemDefault: row.sc_system_default,
                    Category: {
                      Id: row.c_id,
                      Name: row.c_name,
                      Color: row.c_color,
                      SystemDefault: row.c_system_default,
                    },
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
  readById(Id: number,uid: number): Promise<ISubCategory | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select c.id as c_id,c.name as c_name,c.color as c_color,c.system_default as c_system_default,sc.id as sc_id,sc.name as sc_name,sc.icon as sc_icon,c.system_default as sc_system_default from category c inner join sub_category sc on c.id = sc.category_id where ((sc.uid = ?) or (sc.uid is null and sc.system_default = 1)) and sc.id = ?",
        [uid,Id],
        (err, res) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objList: ISubCategory[] = [];
            if (rows) {
              rows.forEach((row) => {
                if (row) {
                  const obj: ISubCategory = {
                    Id: row.sc_id,
                    Icon: row.sc_icon,
                    Name: row.sc_name,
                    SystemDefault: row.sc_system_default,
                    Category: {
                      Id: row.c_id,
                      Name: row.c_name,
                      Color: row.c_color,
                      SystemDefault: row.c_system_default,
                    },
                  };
                  objList.push(obj);
                }
              });
              resolve(objList[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  readByCategoryIdAndName(uid: number,categoryId: number,name: string): Promise<ISubCategory | null> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select c.id as c_id,c.name as c_name,c.color as c_color,c.system_default as c_system_default,sc.id as sc_id,sc.name as sc_name,sc.icon as sc_icon,c.system_default as sc_system_default from category c inner join sub_category sc on c.id = sc.category_id where ((sc.uid = ?) or (sc.uid is null and sc.system_default = 1)) and sc.category_id = ? and sc.name = ?",
        [uid,categoryId,name],
        (err, res) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objList: ISubCategory[] = [];
            if (rows) {
              rows.forEach((row) => {
                if (row) {
                  const obj: ISubCategory = {
                    Id: row.sc_id,
                    Icon: row.sc_icon,
                    Name: row.sc_name,
                    SystemDefault: row.sc_system_default,
                    Category: {
                      Id: row.c_id,
                      Name: row.c_name,
                      Color: row.c_color,
                      SystemDefault: row.c_system_default,
                    },
                  };
                  objList.push(obj);
                }
              });
              resolve(objList[0]);
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
        "insert into sub_category(name,icon,system_default,category_id,uid) values (?,?,0,?,?)",
        [subCategory.Name, subCategory.Icon,subCategory.Category.Id, subCategory.Uid],
        (err, res) => {
          if (err) reject(err);
          else
            this.readById(res.insertId,subCategory.Uid as number)
              .then((x) => resolve(x!))
              .catch(reject);
        }
      );
    });
  }
}
