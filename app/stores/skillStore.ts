import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SkillState {
  skills: ISkill[];
  selectedSkillIds: (string | number)[];
  saveSkills: (payload: ISkill[]) => void;
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
    saveSelectedSkillIds: (payload: number[]) =>
      set((state) => {
        state.selectedSkillIds = payload;
      }),
    handleSelectedSkillIds: (payload: string | number) =>
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
