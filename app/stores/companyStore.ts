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
}

const initialState: CompanyState = {
  isLoading: true,
  company: {} as Company,
  saveCompany: () => {},
  logout: () => {},
  isFollowing: false,
  handleSaveFollow: () => {},
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
    })),
    {
      name: "company",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
