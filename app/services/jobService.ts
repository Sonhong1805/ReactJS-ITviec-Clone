import axios from "~/utils/axiosCustom";

export interface JobsPayload {
  pagination: Pagination;
  data: Job[];
}

const jobService = {
  getAll: (params: {}): Promise<IResponse<JobsPayload>> => {
    return axios.get("/job", {
      params,
    });
  },
  getDetail: (slug: string): Promise<IResponse<Job>> => {
    return axios.get(`/job/${slug}`);
  },

  getQuantity: (): Promise<IResponse<number>> => {
    return axios.get("/job/quantity");
  },

  getByCompany: (param: string | number): Promise<IResponse<Job[]>> => {
    return axios.get(`/job/company/${param}`);
  },

  wishlist: (jobId: number): Promise<IResponse<boolean>> => {
    return axios.post(`/job/wishlist/${jobId}`);
  },

  create: (body: CompanyJob): Promise<IResponse<CompanyJob>> => {
    return axios.post(`/job`, body);
  },

  update: (id: number, body: CompanyJob): Promise<IResponse<CompanyJob>> => {
    return axios.put(`/job/${id}`, body);
  },
  delete: (id: number): Promise<IResponse<string>> => {
    return axios.delete(`/job/${id}`);
  },
};

export default jobService;
