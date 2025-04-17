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
};

export default applicationService;
