import Button from "./index";
import { defineMeta } from "../../utils/define-meta";
import { Form, Input } from "antd";

export default defineMeta(Button, {
  label: "按钮",
  icon: <div>按钮</div>,
  desc: "这是一个按钮",
  options: () => {
    return (
      <Form.Item label="文案" name="text">
        <Input />
      </Form.Item>
    );
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
