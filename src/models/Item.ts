export interface IItem {
  Id?: number | null;
  Uid?: number | null;
  Name: string;
  TechnicalDescription?: string | null;
  AcquisitionDate: Date;
  PurchaseValue?: number | null;
  PurchaseStore?: string | null;
  ResaleValue?: number | null;
  Status?: number;
  Comment?: string | null;
  AcquisitionType: number;
  CreatedAt?: Date;
  UpdatedAt: Date;
}

//status
//1 - Guardado
//2 - Em uso
//3 - Emprestado
//4 - Defeito
//5 - Revendido
//6 - Doado
//7 - Dispensado

//acquisition type
//1 - compra
//2 - emprestimo
//3 - doação
//4 - presente
