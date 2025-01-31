type TLogin = Pick<IUser, "email" | "password">;

type TRegister = Pick<IUser, "username" | "email" | "password">;

type TForgotPassword = Pick<IUser, "email">;

interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}

interface TRegisterEmployer {
  username: string;
  role: string;
  email: string;
  phone: string;
  source?: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
}
