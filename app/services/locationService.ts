import axios from "axios";

const locationService = {
  getProvinces: (params: any) => {
    return axios.get("https://location-pb4e.onrender.com/provinces", {
      params,
    });
  },
};

export default locationService;
