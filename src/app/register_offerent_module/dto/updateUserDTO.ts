export interface UpdateUserDTO {
  dni: number;
  dniType: string;
  country:string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  password: string;
  newPassword: string;
  roleId: number;
}
