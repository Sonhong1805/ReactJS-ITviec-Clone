import axios from "~/utils/axiosCustom";

const applicantService = {
  getDetailByUser: (userId: number): Promise<IResponse<Applicant>> => {
    return axios.get(`/applicant/${userId}`);
  },
};

export default applicantService;
