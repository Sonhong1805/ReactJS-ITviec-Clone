import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
  modal: {
    [key: string]: boolean;
  };
  handleOpenModal: (payload: string) => void;
  handleCloseModal: (payload: string) => void;
}

const initialState: ModalState = {
  modal: {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
};

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    ...initialState,
    handleOpenModal: (payload) =>
      set((state) => {
        state.modal[payload] = true;
        document.body.style.overflow = "hidden";
      }),
    handleCloseModal: (payload) =>
      set((state) => {
        state.modal[payload] = false;
        document.body.style.overflow = "";
      }),
  }))
);
