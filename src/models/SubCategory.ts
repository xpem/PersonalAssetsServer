import { ICategory } from "./Category";

export interface ISubCategory {
  Id?: number | null;
  Uid?: number | null;
  Name: string;
  IconName: string;
  SystemDefault: number;
  Category: ICategory;
  // CreatedAt: Date;
  // UpdatedAt: Date | null;
}
