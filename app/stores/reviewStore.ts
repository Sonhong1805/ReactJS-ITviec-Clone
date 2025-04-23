import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ReviewState {
  cursor: number;
  isReviewSuccess: boolean;
  isReviewing: boolean;
  pagination: CursorPagination;
  handleChangeCursor: (payload: number) => void;
  handleSaveReview: (payload: boolean) => void;
  handleReviewSuccess: (payload: boolean) => void;
  handleSavePagition: (payload: CursorPagination) => void;
}

const initialState: ReviewState = {
  cursor: 0,
  isReviewSuccess: false,
  isReviewing: false,
  pagination: {
    limit: 5,
    next: null,
    totalItems: 0,
  },
  handleChangeCursor: () => {},
  handleReviewSuccess: () => {},
  handleSaveReview: () => {},
  handleSavePagition: () => {},
};

export const useReviewStore = create<ReviewState>()(
  immer((set) => ({
    ...initialState,
    handleChangeCursor: (payload) => {
      set((state) => {
        state.cursor = payload;
      });
    },
    handleReviewSuccess: (payload) => {
      set((state) => {
        state.isReviewSuccess = payload;
      });
    },
    handleSaveReview: (payload) => {
      set((state) => {
        state.isReviewing = payload;
      });
    },
    handleSavePagition: (payload) => {
      set((state) => {
        state.pagination = payload;
      });
    },
  }))
);
