export interface IItem {
  Id?: number | null;
  Uid?: number | null;
  Name: string;
  TechnicalDescription?: string | null;
  AcquisitionDate: Date;
  PurchaseValue?: number | null;
  PurchaseStore?: string | null;
  ResaleValue?: number | null;
  Situation?: number;
  Comment?: string | null;
  AcquisitionType: number;
  CreatedAt?: Date;
  UpdatedAt: Date;
}
