import { defineMeta } from "../../utils/define-meta";
import Box from "./index";

export default defineMeta(Box, {
  type: "component",
  label: "容器",
  icon: <div>Box</div>,
  options: {
    default: {
      title: "",
    },
    form: () => {
      return null;
    },
  },
  events: {
    onClick: {
      label: "点击",
      actions: {
        jumpUrl: {
          label: "链接跳转",
          args: () => {
            return null;
          },
        },
        jumpGoogle: {
          label: "跳转到google",
          args: () => null,
        },
        alert: {
          label: "弹窗",
          args: () => null,
        },
      },
    },
  },
  children: {
    children: "子组件",
  },
});
