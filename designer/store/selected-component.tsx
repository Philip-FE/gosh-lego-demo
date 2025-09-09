import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// 当前选中的组件ID
export const useSelectedComponentStore = create(
  immer<{
    selectedComponentID: string;
    selectComponent: (id: string) => void;
  }>((set) => ({
    selectedComponentID: "",
    selectComponent: (id) => {
      set({
        selectedComponentID: id,
      });
    },
  }))
);
