import axios from "~/utils/axiosCustom";

const industryService = {
  getAll: (): Promise<IResponse<IIndustry[]>> => {
    return axios.get("/industry");
  },
};

export default industryService;
