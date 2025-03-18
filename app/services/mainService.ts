import axios from "~/utils/axiosCustom";

interface SkillsPayload {
  id: string;
  name: string;
}

interface CompaniesPayload extends SkillsPayload {
  slug: string;
}

export interface SearchByKeywordResponse {
  skills: SkillsPayload[];
  companies: CompaniesPayload[];
}
const mainService = {
  searchByKeyword: (
    keyword: string
  ): Promise<IResponse<SearchByKeywordResponse>> => {
    return axios.post(`search?keyword=${keyword}`);
  },
};

export default mainService;
