type TLogin = Pick<IUser, "email" | "password">;

type TRegister = Pick<IUser, "username" | "email" | "password">;

type TForgotPassword = Pick<IUser, "email">;

interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}
