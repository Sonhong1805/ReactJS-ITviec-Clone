import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

interface CompanyState {
  company: Company;
  isLoading: boolean;
  saveCompany: (payload: Company) => void;
  logout: () => void;
  isFollowing: boolean;
  handleSaveFollow: (payload: boolean) => void;

  selectedCompany: Option;
  handleSelectedCompany: (payload: Option) => void;
  handleRemoveSelectedCompany: () => void;
}

const initialState: CompanyState = {
  isLoading: true,
  company: {} as Company,
  saveCompany: () => {},
  logout: () => {},
  isFollowing: false,

  handleSaveFollow: () => {},

  selectedCompany: {} as Option,
  handleSelectedCompany: () => {},
  handleRemoveSelectedCompany: () => {},
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
      handleSaveFollow: (payload) => {
        set((state) => {
          state.isFollowing = payload;
        });
      },

      handleSelectedCompany: (payload) => {
        set((state) => {
          state.selectedCompany = payload;
        });
      },
      handleRemoveSelectedCompany: () => {
        set((state) => {
          state.selectedCompany = initialState.selectedCompany;
        });
      },
    })),
    {
      name: "company",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
