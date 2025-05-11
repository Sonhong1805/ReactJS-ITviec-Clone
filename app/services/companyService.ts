import axios from "~/utils/axiosCustom";

export interface UpdateCompanyPayload {
  id: number;
  body: FormData;
}

export interface CreateReviewPayload {
  id: number;
  body: Review;
}

export interface GetAllReviewResonse {
  data: Review[];
  pagination: CursorPagination;
}

export interface GetCompanyJobsResonse {
  data: CompanyJob[];
  pagination: Pagination;
}

const companyService = {
  getDetail: (param: string | number): Promise<IResponse<Company>> => {
    return axios.get(`/company/${param}`);
  },
  getAll: (params: any): Promise<IResponse<Company[]>> => {
    return axios.get(`/company`, { params });
  },
  update: ({
    id,
    body,
  }: UpdateCompanyPayload): Promise<IResponse<Company[]>> => {
    return axios.put(`/company/${id}`, body);
  },
  follow: (id: number): Promise<IResponse<boolean>> => {
    return axios.post(`/company/follow/${id}`);
  },
  createReview: ({
    id,
    body,
  }: CreateReviewPayload): Promise<IResponse<Review>> => {
    return axios.post(`/company/review/${id}`, body);
  },
  getAllReview: (
    id: number,
    params: any
  ): Promise<IResponse<GetAllReviewResonse>> => {
    return axios.get(`/company/review/${id}`, { params });
  },

  getJobs: (params: {}): Promise<IResponse<GetCompanyJobsResonse>> => {
    return axios.get(`/company/jobs`, { params });
  },
};

export default companyService;
