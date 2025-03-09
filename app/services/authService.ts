import axios from "~/utils/axiosCustom";

const authService = {
  login: (
    body: ILogin
  ): Promise<IResponse<{ accessToken: string; user: IUser }>> => {
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
  account: (): Promise<IResponse<IUser>> => {
    return axios.get("/auth/account");
  },
  loginGoogle: (
    credential: string
  ): Promise<IResponse<{ accessToken: string; user: IUser }>> => {
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
};

export default authService;
