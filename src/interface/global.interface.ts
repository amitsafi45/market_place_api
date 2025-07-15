import { UserRole } from "@/constant/enum";

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
}

export interface PaginationResult<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta: PaginationMeta;
  items: T[];
}

export interface OrderItemCollect{
        product: string,
        priceAtPurchase: number,
        quantity: number
}