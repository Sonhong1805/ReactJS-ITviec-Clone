interface TLogin {
  email: string;
  password: string;
}

type TRegister = Pick<IUser, "username" | "email" | "password">;

type TForgotPassword = Pick<IUser, "email">;

type TApplyJob = Pick<IUser, "username" | "phone"> & {
  letter?: string;
  file: FileList | string;
};

interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}

interface IChangePassword extends IResetPassword {
  currentPassword: string;
}

interface TRegisterEmployer extends IUser {
  source?: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
}
