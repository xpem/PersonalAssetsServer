import { OkPacket } from "mysql2";
import { RowDataPacket } from "mysql2";
import { Conn } from "../keys";
import { IItem } from "../models/Item";

export class ItemService {
  create(item: IItem): Promise<IItem> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "insert into item(uid,name,technical_description,acquisition_date,purchase_value,purchase_store," +
          "resale_value,situation_id,category_id,subcategory_id,comment,acquisition_type_id)" +
          " values (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          item.Uid,
          item.Name,
          item.TechnicalDescription,
          item.AcquisitionDate,
          item.PurchaseValue,
          item.PurchaseStore,
          item.ResaleValue,
          item.Situation?.Id,
          item.Category?.Id,
          item.Category?.SubCategory?.Id,
          item.Comment,
          item.AcquisitionType,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.readById(res.insertId, item.Uid!)
              .then((book) => resolve(book!))
              .catch(reject);
        }
      );
    });
  }
  update(item: IItem): Promise<IItem> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "update item set name = ?,technical_description = ?,acquisition_date = ?,purchase_value = ?," +
          "purchase_store = ?,resale_value = ?,situation_id = ?, category_id = ?,subcategory_id = ?,comment = ?,acquisition_type_id = ? where id = ? and uid = ?",
        [
          item.Name,
          item.TechnicalDescription,
          item.AcquisitionDate,
          item.PurchaseValue,
          item.PurchaseStore,
          item.ResaleValue,
          item.Situation?.Id,
          item.Category?.Id,
          item.Category?.SubCategory?.Id,
          item.Comment,
          item.AcquisitionType,
          item.Id,
          item.Uid,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.readById(item.Id!, item.Uid!)
              .then((book) => resolve(book!))
              .catch(reject);
        }
      );
    });
  }
  delete(id: number, uid: number): Promise<void> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "delete from item where id = ? and uid = ?",
        [id, uid],
        (err, res) => {
          if (err) reject(err);
        }
      );
    });
  }
  readById(itemId: number, uid: number): Promise<IItem | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select i.id,i.name as item_name,i.technical_description,i.acquisition_date,i.purchase_value,i.purchase_store," +
          "i.resale_value,i.situation_id,i.category_id,c.name as category_name,i.subcategory_id,s.name as subcategory_name,i.comment,i.created_at,i.updated_at,i.acquisition_type_id" +
          " from item i left join category c on i.category_id = c.id left join sub_category s on i.subcategory_id = s.id" +
          " where i.id = ? and i.uid = ?",
        [itemId, uid],
        (err, res) => {
          if (err) reject(err);
          else {
            const row = (<RowDataPacket>res)[0];
            if (row) {
              const item: IItem = {
                Id: row.id,
                Name: row.item_name,
                TechnicalDescription: row.technical_description,
                AcquisitionDate: row.acquisition_date,
                AcquisitionType: row.acquisition_type_id,
                PurchaseStore: row.purchase_store,
                PurchaseValue: row.purchase_value,
                ResaleValue: row.resale_value,
                CreatedAt: row.created_at,
                UpdatedAt: row.updated_at,
                Comment: row.comment,
                Situation: row.situation_id,
                Category: {
                  Id: row.category_id,
                  Name: row.category_name,
                  SubCategory: null,
                },
              };

              if (row.subcategory_id && item.Category)
                item.Category.SubCategory = {
                  Id: row.subcategory_id,
                  Name: row.subcategory_name,
                };

              resolve(item);
            } else {
              resolve(undefined);
            }
          }
        }
      );
    });
  }
  readByUid(uid: number): Promise<IItem[] | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select i.id,i.name as item_name,i.technical_description,i.acquisition_date,i.purchase_value,i.purchase_store," +
          "i.resale_value,i.situation_id,i.category_id,c.name as category_name,i.subcategory_id,s.name as subcategory_name,i.comment,i.created_at,i.updated_at,i.acquisition_type_id" +
          " from item i left join category c on i.category_id = c.id left join sub_category s on i.subcategory_id = s.id" +
          " where i.uid = ?",
        [uid],
        (err, res) => {
          if (err) reject(err);
          else {
            const rows = <RowDataPacket[]>res;
            const objlist: IItem[] = [];

            rows.forEach((row) => {
              if (row) {
                const item: IItem = {
                  Id: row.id,
                  Name: row.item_name,
                  TechnicalDescription: row.technical_description,
                  AcquisitionDate: row.acquisition_date,
                  AcquisitionType: row.acquisition_type_id,
                  PurchaseStore: row.purchase_store,
                  PurchaseValue: row.purchase_value,
                  ResaleValue: row.resale_value,
                  CreatedAt: row.created_at,
                  UpdatedAt: row.updated_at,
                  Comment: row.comment,
                  Situation: row.situation_id,
                  Category: {
                    Id: row.category_id,
                    Name: row.category_name,
                    SubCategory: null,
                  },
                };

                if (row.subcategory_id && item.Category)
                  item.Category.SubCategory = {
                    Id: row.subcategory_id,
                    Name: row.subcategory_name,
                  };

                objlist.push(item);
              }
            });
            resolve(objlist);
          }
        }
      );
    });
  }
}
