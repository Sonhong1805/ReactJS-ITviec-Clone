import axios from "~/utils/axiosCustom";

export interface UpdateCompanyPayload {
  id: number;
  body: FormData;
}

export interface CreateReviewPayload {
  id: number;
  body: Review;
}

export interface GetReviewsResonse {
  data: Review[];
  pagination: CursorPagination;
}

export interface GetCompanyJobsResonse {
  data: CompanyJob[];
  pagination: Pagination;
}

export interface GetAllCVResonse {
  data: CVApplication[];
  pagination: Pagination;
}
export interface GetAllReviewResonse {
  data: Review[];
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
  getReviews: (
    id: number,
    params: any
  ): Promise<IResponse<GetReviewsResonse>> => {
    return axios.get(`/company/review/${id}`, { params });
  },
  getJobs: (params: {}): Promise<IResponse<GetCompanyJobsResonse>> => {
    return axios.get(`/company/jobs`, { params });
  },
  getAllCV: (params: Pagination): Promise<IResponse<GetAllCVResonse>> => {
    return axios.get(`/company/all-cv`, { params });
  },
  getAllReview: (
    params: Pagination
  ): Promise<IResponse<GetAllReviewResonse>> => {
    return axios.get(`/company/all-review`, { params });
  },
  deleteReview: (id: number): Promise<IResponse<string>> => {
    return axios.delete(`/company/review/${id}`);
  },
  changeStatusReview: (
    id: number,
    status: ReviewStatus
  ): Promise<IResponse<string>> => {
    return axios.patch(`/company/review/${id}/status`, { status });
  },
};

export default companyService;
