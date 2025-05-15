import axios from "~/utils/axiosCustom";

export interface LoginResponse {
  accessToken: string;
  user: User;
}

const authService = {
  login: (body: ILogin): Promise<IResponse<LoginResponse>> => {
    return axios.post("/auth/login", body);
  },
  register: (body: IRegister): Promise<IResponse<null>> => {
    return axios.post("/auth/register", body);
  },
  registerCompany: (body: TRegisterEmployer): Promise<IResponse<null>> => {
    return axios.post("/auth/register-company", body);
  },
  refresh: () => {
    return axios.get("/auth/refresh");
  },
  account: (): Promise<IResponse<User>> => {
    return axios.get("/auth/account");
  },
  loginGoogle: (
    credential: string
  ): Promise<IResponse<{ accessToken: string; user: User }>> => {
    return axios.post("/auth/login-google", { token: credential });
  },
  logout: (): Promise<IResponse<null>> => {
    return axios.post("/auth/logout");
  },
  forgotPassword: (
    email: string,
    isCompany?: boolean
  ): Promise<IResponse<null>> => {
    return axios.post("/auth/forgot-password", {
      email,
      isCompany,
    });
  },
  resetPassword: (
    email: string,
    password: string
  ): Promise<IResponse<null>> => {
    return axios.post("/auth/reset-password", {
      email,
      password,
    });
  },
  changePassword: (body: IChangePassword): Promise<IResponse<boolean>> => {
    return axios.post("/auth/change-password", body);
  },
  createDeleteCode: (): Promise<IResponse<boolean>> => {
    return axios.get("/auth/delete-code");
  },
  deleteAccount: (code: string): Promise<IResponse<boolean>> => {
    return axios.post("/auth/delete-account", { code });
  },
};

export default authService;
