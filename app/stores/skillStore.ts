import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SkillState {
  skills: Skill[];
  selectedSkillIds: (string | number)[];
  saveSkills: (payload: Skill[]) => void;
  saveSelectedSkillIds: (payload: number[]) => void;
  handleSelectedSkillIds: (payload: string | number) => void;
}

const initialState: SkillState = {
  skills: [],
  selectedSkillIds: [],
  saveSkills: () => {},
  saveSelectedSkillIds: () => {},
  handleSelectedSkillIds: () => {},
};

export const useSkillStore = create<SkillState>()(
  immer((set) => ({
    ...initialState,
    saveSkills: (payload) =>
      set((state) => {
        state.skills = payload;
      }),
    saveSelectedSkillIds: (payload) =>
      set((state) => {
        state.selectedSkillIds = payload;
      }),
    handleSelectedSkillIds: (payload) =>
      set((state) => {
        const selectedSkillIds = state.selectedSkillIds;
        const index = selectedSkillIds.findIndex((item) => item === payload);
        if (index !== -1) {
          selectedSkillIds.splice(index, 1);
        } else {
          selectedSkillIds.push(payload);
        }
      }),
  }))
);
