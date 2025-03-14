import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

interface CompanyState {
  company: Company;
  isLoading: boolean;
  saveCompany: (payload: Company) => void;
  logout: () => void;
}

const initialState: CompanyState = {
  isLoading: true,
  company: {
    id: 0,
    slug: "",
    logo: "",
    position: "",
    companyName: "",
    skills: [],
    companyType: "",
    industry: {
      id: 0,
      name: "",
    },
    companySize: "",
    country: "",
    workingDay: "",
    overtimePolicy: "",
    overview: "",
    perks: "",
    location: "",
    website: "",
    username: "",
    email: "",
    phoneNumber: "",
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  },
  saveCompany: () => {},
  logout: () => {},
};

export const useCompanyStore = create<CompanyState>()(
  persist(
    immer((set) => ({
      ...initialState,
      saveCompany: (payload) =>
        set((state) => {
          state.isLoading = false;
          state.company = payload;
        }),
      logout: () => {
        set((state) => {
          state.company = initialState.company;
        });
        useCompanyStore.persist.clearStorage();
      },
    })),
    {
      name: "company",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
