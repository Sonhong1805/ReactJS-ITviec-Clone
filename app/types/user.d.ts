interface IUser {
  username: string;
  email: string;
  phone?: string;
  password: string;
  loginType: LOGIN_TYPE;
  role: ROLE;
}
