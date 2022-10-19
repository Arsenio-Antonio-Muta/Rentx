interface ICreateUsersDTO {
  name: string;
  password: string;
  email: string;
  drive_licence: string;
  id?: string;
  avatar?: string;
}

export { ICreateUsersDTO };
