type TLogin = Pick<IUser, "email" | "password">;

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

interface TRegisterEmployer extends IUser {
  source?: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
}
