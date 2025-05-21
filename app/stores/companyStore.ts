import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { formatTimestamp } from "~/utils/formatTimestamp";

interface CompanyState {
  company: Company;
  companies: Company[];
  isLoading: boolean;
  isFollowing: boolean;
  selectedCompany: Option;
  jobs: CompanyJob[];
  CVApplications: CVApplication[];
  pagination: Pagination;
  handleSaveCompanies: (payload: Company[]) => void;
  handleSaveJobs: (payload: CompanyJob[]) => void;
  handleSaveCVApplications: (payload: CVApplication[]) => void;
  handleSavePagination: (payload: Pagination) => void;
  handleSaveCompany: (payload: Company) => void;
  handleSaveFollow: (payload: boolean) => void;
  handleSelectedCompany: (payload: Option) => void;
  handleRemoveSelectedCompany: () => void;
  handleCreateJob: (payload: CompanyJob) => void;
  handleUpdateJob: (payload: CompanyJob) => void;
  handleRemoveJob: (payload: { id: number; deletedAt: string }) => void;

  handleRemoveApplication: (payload: { id: number; deletedAt: string }) => void;
  handleChangeStatus: (payload: {
    id: number;
    status: ApplicationStatus;
  }) => void;
}

const initialState: CompanyState = {
  isLoading: true,
  isFollowing: false,
  company: {} as Company,
  companies: [],
  selectedCompany: {} as Option,
  jobs: [],
  CVApplications: [],
  pagination: {} as Pagination,
  handleSaveCompanies: () => {},
  handleSaveJobs: () => {},
  handleSaveCVApplications: () => {},
  handleSavePagination: () => {},
  handleSaveCompany: () => {},
  handleSaveFollow: () => {},
  handleSelectedCompany: () => {},
  handleRemoveSelectedCompany: () => {},
  handleCreateJob: () => {},
  handleUpdateJob: () => {},
  handleRemoveJob: () => {},
  handleRemoveApplication: () => {},
  handleChangeStatus: () => {},
};

export const useCompanyStore = create<CompanyState>()(
  immer((set) => ({
    ...initialState,
    handleSaveCompany: (payload) =>
      set((state) => {
        state.isLoading = false;
        state.company = payload;
      }),
    handleSaveCompanies: (payload) =>
      set((state) => {
        state.isLoading = false;
        state.companies = payload;
      }),
    handleSavePagination: (payload) =>
      set((state) => {
        state.pagination = payload;
      }),
    handleSaveJobs: (payload) =>
      set((state) => {
        state.jobs = payload;
      }),
    handleSaveCVApplications: (payload) =>
      set((state) => {
        state.CVApplications = payload;
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
          job.updatedAt = payload.deletedAt;
        }
      });
    },

    handleRemoveApplication: (payload) => {
      set((state) => {
        const application = state.CVApplications.find(
          (application) => application.id === payload.id
        );
        if (application) {
          application.deletedAt = payload.deletedAt;
          application.updatedAt = payload.deletedAt;
        }
      });
    },
    handleChangeStatus: (payload) => {
      set((state) => {
        const application = state.CVApplications.find(
          (application) => application.id === payload.id
        );
        if (application) {
          application.status = payload.status;
          application.updatedAt = formatTimestamp(new Date());
        }
      });
    },
  }))
);
