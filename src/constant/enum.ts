export enum Environment {
  Development = 'Development',
  Production = 'Production',
}

export enum UserRole {
  'Buyer' = 'Buyer',
  'Seller' = 'Seller',
}
export enum OrderStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  CANCELLED = 'Cancelled', // (optional) in case you want to add more states later
}
