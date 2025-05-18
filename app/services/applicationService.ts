import axios from "~/utils/axiosCustom";

export interface CreateApplicationPayload {
  slug: string;
  body: FormData;
}

const applicationService = {
  create: ({
    slug,
    body,
  }: CreateApplicationPayload): Promise<IResponse<Application>> => {
    return axios.post(`/application/${slug}`, body);
  },
  delete: (id: number): Promise<IResponse<string>> => {
    return axios.delete(`/application/${id}`);
  },
  getJobStatus: (params: {}): Promise<IResponse<MyJobStatusWithPagination>> => {
    return axios.get(`/application/job-status`, { params });
  },
  changeStatus: (
    id: number,
    body: RequestChangeStatus
  ): Promise<IResponse<ApplicationStatus>> => {
    return axios.patch(`/application/${id}/status`, body);
  },
};

export default applicationService;
