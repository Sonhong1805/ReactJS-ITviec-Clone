import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: User) => void;
  logout: () => void;
  handleSaveUser: (payload: User) => void;
  updateCompanyInfo: (
    payload: Pick<User, "username" | "email" | "phoneNumber">
  ) => void;
}

const initialState: UserState = {
  user: {} as User,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  handleSaveUser: () => {},
  updateCompanyInfo: () => {},
};

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      ...initialState,
      login: (payload) =>
        set((state) => {
          state.isAuthenticated = true;
          state.isLoading = false;
          state.user = payload;
        }),
      logout: () => {
        set((state) => {
          state.isAuthenticated = false;
          state.user = initialState.user;
        });
        useUserStore.persist.clearStorage();
      },
      handleSaveUser: (payload) => {
        set((state) => {
          state.user = { ...state.user, ...payload };
        });
      },
      updateCompanyInfo: (payload) => {
        set((state) => {
          const currentUsername = state.user.username;
          const currentEmail = state.user.email;
          const currentPhoneNumber = state.user.phoneNumber;
          if (currentUsername !== payload.username) {
            state.user.username = payload.username;
          }
          if (currentEmail !== payload.email) {
            state.user.email = payload.email;
          }
          if (currentPhoneNumber !== payload.phoneNumber) {
            state.user.phoneNumber = payload.phoneNumber;
          }
        });
      },
    })),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
