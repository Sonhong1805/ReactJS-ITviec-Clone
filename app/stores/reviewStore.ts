import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { formatTimestamp } from "~/utils/formatTimestamp";

interface ReviewState {
  cursor: number;
  isReviewSuccess: boolean;
  isReviewing: boolean;
  reviews: Review[];
  reviewPagination: Pagination;
  pagination: CursorPagination;
  handleSaveReviews: (payload: Review[]) => void;
  handleSaveReviewPagination: (payload: Pagination) => void;
  handleChangeCursor: (payload: number) => void;
  handleSaveReview: (payload: boolean) => void;
  handleReviewSuccess: (payload: boolean) => void;
  handleSavePagition: (payload: CursorPagination) => void;
  handleRemoveReview: (payload: { id: number; deletedAt: string }) => void;
  handleChangeStatus: (payload: { id: number; status: ReviewStatus }) => void;
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
  reviews: [],
  reviewPagination: {} as Pagination,
  handleSaveReviews: () => {},
  handleSaveReviewPagination: () => {},
  handleChangeCursor: () => {},
  handleReviewSuccess: () => {},
  handleSaveReview: () => {},
  handleSavePagition: () => {},
  handleRemoveReview: () => {},
  handleChangeStatus: () => {},
};

export const useReviewStore = create<ReviewState>()(
  immer((set) => ({
    ...initialState,
    handleChangeCursor: (payload) => {
      set((state) => {
        state.cursor = payload;
      });
    },
    handleSaveReviews: (payload) => {
      set((state) => {
        state.reviews = payload;
      });
    },
    handleSaveReviewPagination: (payload) => {
      set((state) => {
        state.reviewPagination = payload;
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
    handleRemoveReview: (payload) => {
      set((state) => {
        const review = state.reviews.find((review) => review.id === payload.id);
        if (review) {
          review.deletedAt = payload.deletedAt;
          review.updatedAt = payload.deletedAt;
        }
      });
    },
    handleChangeStatus: (payload) => {
      set((state) => {
        const review = state.reviews.find((review) => review.id === payload.id);
        if (review) {
          review.status = payload.status;
          review.updatedAt = formatTimestamp(new Date());
        }
      });
    },
  }))
);
