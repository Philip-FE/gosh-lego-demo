import { Form, Input } from "antd";
import { defineMeta } from "../../utils/define-meta";
import Box from "./index";

export default defineMeta(Box, {
  label: "容器",
  icon: <div>Box</div>,
  desc: "这是一个容器",
  options: () => {
    return (
      <Form.Item label="Box标题" name="title">
        <Input />
      </Form.Item>
    );
  },
  defaultOptions: {
    title: "",
  },
  events: {
    onClick: {
      label: "点击",
      actions: {
        jumpUrl: {
          label: "链接跳转",
          args: () => {
            return (
              <Form.Item label="链接" name="url">
                <Input />
              </Form.Item>
            );
          },
        },
        jumpGoogle: {
          label: "跳转到google",
        },
        alert: {
          label: "弹窗",
          args: () => {
            return (
              <Form.Item label="消息" name="message">
                <Input />
              </Form.Item>
            );
          },
        },
      },
    },
  },
  children: {
    children: "内容",
  },
});
