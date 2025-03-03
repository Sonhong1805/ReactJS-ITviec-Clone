import axios from "~/utils/axiosCustom";

const authService = {
  login: (
    body: TLogin
  ): Promise<IResponse<{ accessToken: string; user: IUser }>> => {
    return axios.post("/auth/login", body);
  },
  refresh: () => {
    return axios.get("/auth/refresh");
  },
  account: () => {
    return axios.get("/auth/account");
  },
  logout: () => {
    return axios.post("/auth/logout");
  },
};

export default authService;
