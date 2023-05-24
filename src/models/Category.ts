import { ISubCategory } from "./SubCategory";

export interface ICategory {
  Id?: number | null;
  Uid?: number | null;
  Name: string;
  Color: string | null;
  SystemDefault: number;
  SubCategories: ISubCategory[];
  // CreatedAt: Date;
  // UpdatedAt: Date | null;
}
