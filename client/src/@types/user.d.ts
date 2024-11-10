export interface User {
  _id: string;
  username: string;
  email: string;
  roles: ('customer' | 'seller' | 'admin') [];
  firstName?: string;
  lastName?: string;
  verified?: boolean;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}