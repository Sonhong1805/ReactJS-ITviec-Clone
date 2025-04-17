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
  getDetail: (slug: string): Promise<IResponse<Job>> => {
    return axios.get(`/job/${slug}`);
  },

  getByCompany: (param: string | number): Promise<IResponse<Job[]>> => {
    return axios.get(`/job/company/${param}`);
  },

  wishlist: (jobId: number): Promise<IResponse<boolean>> => {
    return axios.post(`/job/wishlist/${jobId}`);
  },
};

export default jobService;
