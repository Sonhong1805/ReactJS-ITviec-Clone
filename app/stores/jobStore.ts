import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const getArrayParamsFromURL = (params: string): string[] => {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.getAll(params);
  }
  return [];
};

const getSingleParamFromURL = (param: string): string => {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param) ?? "";
  }
  return "";
};

interface JobState {
  pagination: Pagination;
  selectedJob: Job;
  selectedLevels: string[];
  selectedWorkingModels: string[];
  selectedCompanyTypes: string[];
  selectedIndustries: (string | number)[];
  selectedMinSalary: number;
  selectedMaxSalary: number;
  jobDetail: Job;
  handleSelectedJob: (payload: Job) => void;
  handleSavePagination: (payload: Pagination) => void;
  handleSelectedLevels: (payload: string) => void;
  handleSelectedWorkingModels: (payload: string) => void;
  handleSelectedCompanyTypes: (payload: string) => void;
  handleSelectedIndustries: (payload: string | number) => void;
  handleSelectedMinSalary: (payload: number) => void;
  handleSelectedMaxSalary: (payload: number) => void;
  handleSaveLevels: (payload: string[]) => void;
  handleSaveWorkingModels: (payload: string[]) => void;
  handleSaveIndustries: (payload: string[]) => void;
  handleSaveCompanyTypes: (payload: string[]) => void;
  handleResetSelectedLevels: () => void;
  handleResetSelectedWorkingModels: () => void;
  handleResetSelectedIndustries: () => void;
  handleResetSelectedSalary: () => void;
  handleResetAllSelected: () => void;
  handleSaveJobDetail: (payload: Job) => void;
  handleAppliedSuccess: (payload: Application) => void;
  handleWishlist: (payload: boolean) => void;
}

const initialState: JobState = {
  pagination: {} as Pagination,
  selectedJob: {} as Job,
  selectedLevels: getArrayParamsFromURL("levels"),
  selectedWorkingModels: getArrayParamsFromURL("workingModels"),
  selectedCompanyTypes: getArrayParamsFromURL("companyTypes"),
  selectedIndustries: getArrayParamsFromURL("industries"),
  selectedMinSalary: +getSingleParamFromURL("minSalary") || 500,
  selectedMaxSalary: +getSingleParamFromURL("maxSalary") || 10000,
  jobDetail: {} as Job,
  handleSelectedJob: () => {},
  handleSavePagination: () => {},
  handleSelectedLevels: () => {},
  handleSelectedWorkingModels: () => {},
  handleSelectedCompanyTypes: () => {},
  handleSelectedIndustries: () => {},
  handleSelectedMinSalary: () => {},
  handleSelectedMaxSalary: () => {},
  handleSaveLevels: () => {},
  handleSaveWorkingModels: () => {},
  handleSaveIndustries: () => {},
  handleSaveCompanyTypes: () => {},
  handleResetSelectedLevels: () => {},
  handleResetSelectedWorkingModels: () => {},
  handleResetSelectedIndustries: () => {},
  handleResetSelectedSalary: () => {},
  handleResetAllSelected: () => {},
  handleSaveJobDetail: () => {},
  handleAppliedSuccess: () => {},
  handleWishlist: () => {},
};

export const useJobStore = create<JobState>()(
  immer((set) => ({
    ...initialState,
    handleSelectedJob: (payload) =>
      set((state) => {
        state.selectedJob = payload;
      }),
    handleSavePagination: (payload) =>
      set((state) => {
        state.pagination = payload;
      }),
    handleSelectedLevels: (payload) =>
      set((state) => {
        const selectedLevels = state.selectedLevels;
        const index = selectedLevels.findIndex((item) => item === payload);
        if (index !== -1) {
          selectedLevels.splice(index, 1);
        } else {
          selectedLevels.push(payload);
        }
      }),
    handleSelectedWorkingModels: (payload) =>
      set((state) => {
        const selectedWorkingModels = state.selectedWorkingModels;
        const index = selectedWorkingModels.findIndex(
          (item) => item === payload
        );
        if (index !== -1) {
          selectedWorkingModels.splice(index, 1);
        } else {
          selectedWorkingModels.push(payload);
        }
      }),
    handleSelectedCompanyTypes: (payload) =>
      set((state) => {
        const selectedCompanyTypes = state.selectedCompanyTypes;
        const index = selectedCompanyTypes.findIndex(
          (item) => item === payload
        );
        if (index !== -1) {
          selectedCompanyTypes.splice(index, 1);
        } else {
          selectedCompanyTypes.push(payload);
        }
      }),
    handleSelectedIndustries: (payload) =>
      set((state) => {
        const selectedIndustries = state.selectedIndustries;
        const index = selectedIndustries.findIndex((item) => item === payload);
        if (index !== -1) {
          selectedIndustries.splice(index, 1);
        } else {
          selectedIndustries.push(payload);
        }
      }),
    handleSelectedMinSalary: (payload) =>
      set((state) => {
        state.selectedMinSalary = payload;
      }),
    handleSelectedMaxSalary: (payload) =>
      set((state) => {
        state.selectedMaxSalary = payload;
      }),
    handleSaveLevels: (payload) =>
      set((state) => {
        state.selectedLevels = payload;
      }),
    handleSaveWorkingModels: (payload) =>
      set((state) => {
        state.selectedWorkingModels = payload;
      }),
    handleSaveIndustries: (payload) =>
      set((state) => {
        state.selectedIndustries = payload;
      }),
    handleSaveCompanyTypes: (payload) =>
      set((state) => {
        state.selectedCompanyTypes = payload;
      }),
    handleResetSelectedLevels: () =>
      set((state) => {
        state.selectedLevels = [];
      }),
    handleResetSelectedWorkingModels: () =>
      set((state) => {
        state.selectedWorkingModels = [];
      }),
    handleResetSelectedIndustries: () =>
      set((state) => {
        state.selectedIndustries = [];
      }),
    handleResetSelectedSalary: () =>
      set((state) => {
        state.selectedMinSalary = 500;
        state.selectedMaxSalary = 10000;
      }),
    handleResetAllSelected: () =>
      set((state) => {
        state.selectedLevels = initialState.selectedLevels;
        state.selectedWorkingModels = initialState.selectedWorkingModels;
        state.selectedIndustries = initialState.selectedIndustries;
        state.selectedCompanyTypes = initialState.selectedCompanyTypes;
        state.selectedMinSalary = initialState.selectedMinSalary;
        state.selectedMaxSalary = initialState.selectedMaxSalary;
      }),
    handleSaveJobDetail: (payload) =>
      set((state) => {
        state.jobDetail = payload;
      }),
    handleAppliedSuccess: (payload) =>
      set((state) => {
        state.selectedJob.hasApplied = payload;
        state.jobDetail.hasApplied = payload;
      }),
    handleWishlist: (payload) =>
      set((state) => {
        state.selectedJob.wishlist = payload;
        state.jobDetail.wishlist = payload;
      }),
  }))
);
