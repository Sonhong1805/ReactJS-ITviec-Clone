import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface WorkingModelState {
  expectedWorkingModels: Option[];
  expectedWorkingModelsTmp: Option[];
  handleAddExpectedWorkingModel: (payload: Option) => void;
  handleAddExpectedWorkingModels: (payload: Option[]) => void;
  handleRemoveExpectedWorkingModel: () => void;
}

const initialState: WorkingModelState = {
  expectedWorkingModels: [],
  expectedWorkingModelsTmp: [],
  handleAddExpectedWorkingModel: () => {},
  handleAddExpectedWorkingModels: () => {},
  handleRemoveExpectedWorkingModel: () => {},
};

export const useWorkingModelStore = create<WorkingModelState>()(
  immer((set) => ({
    ...initialState,
    handleAddExpectedWorkingModel: (payload) =>
      set((state) => {
        const expectedWorkingModelsTmp = state.expectedWorkingModelsTmp;
        const index = expectedWorkingModelsTmp.findIndex(
          (workingModel) => workingModel === payload
        );
        if (index !== -1) {
          expectedWorkingModelsTmp.splice(index, 1);
        } else {
          expectedWorkingModelsTmp.push(payload);
        }
      }),
    handleAddExpectedWorkingModels: (payload) =>
      set((state) => {
        state.expectedWorkingModels = payload;
        state.expectedWorkingModelsTmp = payload;
      }),
    handleRemoveExpectedWorkingModel: () =>
      set((state) => {
        state.expectedWorkingModelsTmp.pop();
      }),
  }))
);
