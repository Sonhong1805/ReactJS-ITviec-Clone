import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SkillState {
  skills: Skill[];
  skillOptions: Option[];
  selectedSkillIds: (string | number)[];
  selectedSkill: Option;
  saveSkills: (payload: Skill[]) => void;
  saveSkillOptions: (payload: Option[]) => void;
  saveSelectedSkillIds: (payload: number[]) => void;
  handleSelectedSkillIds: (payload: string | number) => void;
  handleSelectedSkill: (payload: Option) => void;
  handleRemoveSelectedSkill: () => void;
}

const initialState: SkillState = {
  skills: [],
  skillOptions: [],
  selectedSkillIds: [],
  selectedSkill: {} as Option,
  saveSkills: () => {},
  saveSkillOptions: () => {},
  saveSelectedSkillIds: () => {},
  handleSelectedSkillIds: () => {},
  handleSelectedSkill: () => {},
  handleRemoveSelectedSkill: () => {},
};

export const useSkillStore = create<SkillState>()(
  immer((set) => ({
    ...initialState,
    saveSkills: (payload) =>
      set((state) => {
        state.skills = payload;
      }),
    saveSkillOptions: (payload) =>
      set((state) => {
        state.skillOptions = payload;
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
    handleSelectedSkill: (payload) => {
      set((state) => {
        state.selectedSkill = payload;
      });
    },
    handleRemoveSelectedSkill: () => {
      set((state) => {
        state.selectedSkill = initialState.selectedSkill;
      });
    },
  }))
);
