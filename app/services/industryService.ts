import axios from "~/utils/axiosCustom";

const industryService = {
  getAll: (params?: any): Promise<IResponse<Industry[]>> => {
    return axios.get("/industry", { params });
  },
};

export default industryService;
