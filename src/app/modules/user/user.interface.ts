export type TUserFullName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders?: TUserOrder[];
};

// export interface UserModel extends Model<TUser> {
//   isUserExists(id: string): Promise<TUser | null>;
// }
