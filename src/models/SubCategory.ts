import { ICategory } from "./Category";

export interface ISubCategory {
  Id?: number | null;
  Uid?: number | null;
  CategoryId: number;
  Name: string;
  IconName: string;
  SystemDefault: number;
  //Category: ICategory | null;
  // CreatedAt: Date;
  // UpdatedAt: Date | null;
}
