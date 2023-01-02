import { OkPacket } from "mysql2";
import { RowDataPacket } from "mysql2";
import { Conn } from "../keys";
import { IItem } from "../models/Item";

export class ItemService {
  create(item: IItem): Promise<IItem> {
    return new Promise((resolve, reject) => {
      Conn.query<OkPacket>(
        "insert into items(uid,name,technical_description,acquisition_date,purchase_value,purchase_store,resale_value,status_id,comment,acquisition_type_id)" +
          " values (?,?,?,?,?,?,?,?,?,?)",
        [
          item.Uid,
          item.Name,
          item.TechnicalDescription,
          item.AcquisitionDate,
          item.PurchaseValue,
          item.PurchaseStore,
          item.ResaleValue,
          item.Status,
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
        "update items set name = ?,technical_description = ?,acquisition_date = ?,purchase_value = ?,purchase_store = ?,resale_value = ?,status_id = ?,comment = ?,acquisition_type_id = ? where id = ? and uid = ?",
        [
          item.Name,
          item.TechnicalDescription,
          item.AcquisitionDate,
          item.PurchaseValue,
          item.PurchaseStore,
          item.ResaleValue,
          item.Status,
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
        "delete from items where id = ? and uid = ?",
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
        "select id,name,technical_description,acquisition_date,purchase_value,purchase_store, " +
          "resale_value,status_id,comment,created_at,updated_at,acquisition_type_id from items where id = ? and uid = ?",
        [itemId, uid],
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
  readByUid(uid: number): Promise<IItem[] | undefined> {
    return new Promise((resolve, reject) => {
      Conn.query(
        "select id,name,technical_description,acquisition_date,purchase_value,purchase_store, " +
          "resale_value,status_id,comment,created_at,updated_at,acquisition_type_id from items where uid = ?",
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
