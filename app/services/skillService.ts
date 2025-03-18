import axios from "~/utils/axiosCustom";

const skillService = {
  getAll: (params?: any): Promise<IResponse<Skill[]>> => {
    return axios.get("/skill", { params });
  },
};

export default skillService;
