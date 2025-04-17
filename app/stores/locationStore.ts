import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface LocationState {
  locations: Option[];
  handleAddLocation: (payload: Option) => void;
  handleAddLocations: (payload: Option[]) => void;
  handleRemoveLocation: () => void;
}

const initialState: LocationState = {
  locations: [],
  handleAddLocation: () => {},
  handleAddLocations: () => {},
  handleRemoveLocation: () => {},
};

export const useLocationStore = create<LocationState>()(
  immer((set) => ({
    ...initialState,
    handleAddLocation: (payload) =>
      set((state) => {
        state.locations.push(payload);
      }),
    handleAddLocations: (payload) =>
      set((state) => {
        state.locations = payload;
      }),
    handleRemoveLocation: () =>
      set((state) => {
        state.locations.pop();
      }),
  }))
);
