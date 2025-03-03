import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UserState {
  user: IUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: IUser) => void;
  logout: () => void;
}

const initialState: UserState = {
  user: {
    id: 0,
    username: "",
    email: "",
    loginType: "EMAIL",
    role: "APPLICANT",
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  },
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
};

export const useUserStore = create<UserState>()(
  immer((set) => ({
    ...initialState,
    login: (payload) =>
      set((state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = payload;
      }),
    logout: () => initialState,
  }))
);
