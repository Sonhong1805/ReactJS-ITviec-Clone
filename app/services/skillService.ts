import axios from "~/utils/axiosCustom";

const skillService = {
  getAll: (params?: any): Promise<IResponse<ISkill[]>> => {
    return axios.get("/skill", { params });
  },
};

export default skillService;
