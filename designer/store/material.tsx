import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useMaterialStore = create(
  immer<{
    materialType: "template" | "component"; // 当前是在编辑模板还是组件
    componentID: string; // materialType为component时，表示选中的组件ID
    selectComponent: (id: string) => void;
    selectMaterialType: (type: "template" | "component") => void;
  }>((set) => ({
    componentID: "",
    materialType: "template",
    selectComponent: (id) => {
      set((draft) => {
        draft.componentID = id;
      });
    },
    selectMaterialType: (type: "template" | "component") => {
      set((draft) => {
        draft.materialType = type;
      });
    },
  }))
);
