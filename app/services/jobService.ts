import axios from "~/utils/axiosCustom";

const jobService = {
  getAll: (params: any) => {
    return axios.get("/manuscript?page=1&limit=10", {
      params,
    });
  },
};

export default jobService;
