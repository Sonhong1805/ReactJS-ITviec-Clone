import axios from "~/utils/axiosCustom";

export interface JobsPayload {
  pagination: Pagination;
  data: Job[];
}

const jobService = {
  getAll: (params: any): Promise<IResponse<JobsPayload>> => {
    return axios.get("/job", {
      params,
    });
  },

  getByCompany: (param: string | number): Promise<IResponse<Job[]>> => {
    return axios.get(`/job/company/${param}`);
  },
  getQuantity: (): Promise<IResponse<number>> => {
    return axios.get("/job/quantity");
  },
};

export default jobService;
