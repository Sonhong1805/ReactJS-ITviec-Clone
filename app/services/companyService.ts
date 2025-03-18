import axios from "~/utils/axiosCustom";

export interface UpdateCompanyPayload {
  id: number;
  body: FormData;
}

const companyService = {
  getDetail: (param: string | number): Promise<IResponse<Company>> => {
    return axios.get(`/company/${param}`);
  },
  getAll: (): Promise<IResponse<Company[]>> => {
    return axios.get(`/company`);
  },
  update: ({
    id,
    body,
  }: UpdateCompanyPayload): Promise<IResponse<Company[]>> => {
    return axios.put(`/company/${id}`, body);
  },
};

export default companyService;
