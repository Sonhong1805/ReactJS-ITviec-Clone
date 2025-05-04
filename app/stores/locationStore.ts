import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface LocationState {
  locations: Option[];
  locationsTmp: Option[];
  handleAddLocation: (payload: Option) => void;
  handleAddLocations: (payload: Option[]) => void;
  handleRemoveLocation: () => void;
}

const initialState: LocationState = {
  locations: [],
  locationsTmp: [],
  handleAddLocation: () => {},
  handleAddLocations: () => {},
  handleRemoveLocation: () => {},
};

export const useLocationStore = create<LocationState>()(
  immer((set) => ({
    ...initialState,
    handleAddLocation: (payload) =>
      set((state) => {
        state.locationsTmp.push(payload);
      }),
    handleAddLocations: (payload) =>
      set((state) => {
        state.locations = payload;
        state.locationsTmp = payload;
      }),
    handleRemoveLocation: () =>
      set((state) => {
        state.locationsTmp.pop();
      }),
  }))
);
