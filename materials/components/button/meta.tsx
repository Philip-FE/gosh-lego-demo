import Button from "./index";
import { defineMeta } from "../../utils/define-meta";

export default defineMeta(Button, {
  type: "component",
  label: "按钮",
  icon: <div>按钮</div>,
  options: {
    default: {
      text: "点击我",
    },
    form: () => {
      return null;
    },
  },
  events: {
    onClick: {
      label: "点击",
      actions: {
        alert: {
          label: "弹窗",
          args: () => {
            return null;
          },
        },
      },
    },
  },
});
