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

interface RegisterEmployer extends User {
  source?: string;
  position: string;
  companyName: string;
  location: string;
  website: string;
}

interface DeleteAccount {
  code: string;
}
