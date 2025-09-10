import type { Schema } from "./../../common/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const demoSchema = {
  template: "Empty",
  children: {
    children: ["1", "3"],
  },
  components: {
    "1": {
      id: "1",
      name: "Box",
      options: {
        title: "hello world",
      },
      events: {
        onClick: {
          action: "alert",
          args: {
            message: "hello world",
          },
        },
      },
      children: {
        children: ["2"],
      },
    },
    "2": {
      id: "2",
      name: "Button",
      options: {
        text: "click me",
      },
      events: {
        onClick: {
          action: "alert",
          args: {
            content: "clicked button",
          },
        },
      },
    },
    "3": {
      id: "3",
      name: "Button",
      options: {
        text: "click me",
      },
      events: {
        onClick: {
          action: "alert",
          args: {
            content: "clicked button",
          },
        },
      },
    },
  },
};

// 全局schema
export const useSchemaStore = create(
  immer<{
    schema: Schema;
    updateSchema: (updator: (schema: Schema) => void) => void;
  }>((set) => ({
    schema: demoSchema,
    updateSchema: (updator) => {
      set((state) => {
        updator(state.schema);
      });
    },
  }))
);
