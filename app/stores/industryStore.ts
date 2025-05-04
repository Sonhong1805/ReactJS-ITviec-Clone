import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IndustryState {
  industryExperiences: Option[];
  industryExperiencesTmp: Option[];
  handleAddIndustryExperience: (payload: Option) => void;
  handleAddIndustryExperiences: (payload: Option[]) => void;
  handleRemoveIndustryExperience: () => void;
}

const initialState: IndustryState = {
  industryExperiences: [],
  industryExperiencesTmp: [],
  handleAddIndustryExperience: () => {},
  handleAddIndustryExperiences: () => {},
  handleRemoveIndustryExperience: () => {},
};

export const useIndustryStore = create<IndustryState>()(
  immer((set) => ({
    ...initialState,
    handleAddIndustryExperience: (payload) =>
      set((state) => {
        state.industryExperiencesTmp.push(payload);
      }),
    handleAddIndustryExperiences: (payload) =>
      set((state) => {
        state.industryExperiences = payload;
        state.industryExperiencesTmp = payload;
      }),
    handleRemoveIndustryExperience: () =>
      set((state) => {
        state.industryExperiencesTmp.pop();
      }),
  }))
);
