export interface IItem {
  Id?: number | null;
  Uid?: number | null;
  Name: string;
  TechnicalDescription?: string | null;
  AcquisitionDate: Date;
  PurchaseValue?: number | null;
  PurchaseStore?: string | null;
  ResaleValue?: number | null;
  Situation?: { Id: number; Name: string | null };
  Category?: {
    Id: number;
    Name: string | null;
    Color: string | null;
    SubCategory?: {
      Id: number;
      Name: string | null;
      IconName: string | null;
    } | null;
  };
  Comment?: string | null;
  AcquisitionType: number;
  CreatedAt?: Date;
  UpdatedAt: Date;
}
