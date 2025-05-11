import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CompanyState {
  company: Company;
  isLoading: boolean;
  isFollowing: boolean;
  selectedCompany: Option;
  jobs: CompanyJob[];
  pagination: Pagination;
  handleSaveJobs: (payload: CompanyJob[]) => void;
  handleSavePagination: (payload: Pagination) => void;
  handleSaveCompany: (payload: Company) => void;
  handleSaveFollow: (payload: boolean) => void;
  handleSelectedCompany: (payload: Option) => void;
  handleRemoveSelectedCompany: () => void;
  handleCreateJob: (payload: CompanyJob) => void;
  handleUpdateJob: (payload: CompanyJob) => void;
  handleRemoveJob: (payload: { id: number; deletedAt: string }) => void;
}

const initialState: CompanyState = {
  isLoading: true,
  isFollowing: false,
  company: {} as Company,
  selectedCompany: {} as Option,
  jobs: [],
  pagination: {} as Pagination,
  handleSaveJobs: () => {},
  handleSavePagination: () => {},
  handleSaveCompany: () => {},
  handleSaveFollow: () => {},
  handleSelectedCompany: () => {},
  handleRemoveSelectedCompany: () => {},
  handleCreateJob: () => {},
  handleUpdateJob: () => {},
  handleRemoveJob: () => {},
};

export const useCompanyStore = create<CompanyState>()(
  immer((set) => ({
    ...initialState,
    handleSaveCompany: (payload) =>
      set((state) => {
        state.isLoading = false;
        state.company = payload;
      }),
    handleSavePagination: (payload) =>
      set((state) => {
        state.pagination = payload;
      }),
    handleSaveJobs: (payload) =>
      set((state) => {
        state.jobs = payload;
      }),
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
    handleCreateJob: (payload) => {
      set((state) => {
        if (state.jobs.length >= state.pagination.limit) {
          state.jobs.pop();
        }
        if (state.pagination.page === 1) {
          state.jobs.unshift(payload);
        } else {
          state.pagination.page = 1;
        }
        const newTotalItems = state.pagination.totalItems + 1;
        const newTotalPages = Math.ceil(newTotalItems / state.pagination.limit);

        state.pagination.totalItems = newTotalItems;
        state.pagination.totalPages = newTotalPages;
      });
    },
    handleUpdateJob: (payload) => {
      set((state) => {
        const currentJob = state.jobs.find((job) => job.id === payload.id);
        if (currentJob) {
          Object.assign(currentJob, payload);
        }
      });
    },
    handleRemoveJob: (payload) => {
      set((state) => {
        const job = state.jobs.find((job) => job.id === payload.id);
        if (job) {
          job.deletedAt = payload.deletedAt;
        }
      });
    },
  }))
);
