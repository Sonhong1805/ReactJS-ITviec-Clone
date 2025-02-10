import axios from "~/utils/axios-customize";

const locationService = {
  getProvinces: (params: any) => {
    return axios.get("https://location-pb4e.onrender.com/provinces", {
      params,
    });
  },
};

export default locationService;
