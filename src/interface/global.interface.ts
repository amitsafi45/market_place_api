import { UserRole } from "@/constant/enum";

export interface IJwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface IPaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
}

export interface IPaginationResult<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta: IPaginationMeta;
  items: T[];
}

export interface IOrderItemCollect{
        product: string,
        priceAtPurchase: number,
        quantity: number
}

export type RawSQL = string & { __type: 'RawSQL' };