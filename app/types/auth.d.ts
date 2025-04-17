interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {
  username: string;
}

type TForgotPassword = Pick<IUser, "email">;

interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}

interface IChangePassword extends IResetPassword {
  currentPassword: string;
}

interface TRegisterEmployer extends IUser {
  source?: string;
  position: string;
  companyName: string;
  location: string;
  website: string;
}
