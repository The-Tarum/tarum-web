
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  location?: string;
}

export enum UserRole {
  BUYER = 'BUYER',
  SUPPLIER = 'SUPPLIER',
  ADMIN = 'ADMIN'
}

export class UserDTO implements IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  location?: string;

  constructor(data: Partial<IUser>) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.role = data.role || UserRole.BUYER;
    this.company = data.company;
    this.location = data.location;
  }
}
