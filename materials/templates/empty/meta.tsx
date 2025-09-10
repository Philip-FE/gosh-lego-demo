import Empty from "./index";
import { defineMeta } from "../../utils/define-meta";
import { Form, Input } from "antd";

const meta = defineMeta(Empty, {
  label: "空白模板",
  icon: (
    <div className="w-[100px] h-[100px] flex justify-center items-center bg-blue-600 text-white">
      模板图标
    </div>
  ),
  desc: "介绍一下模板的使用场景",
  children: {
    children: "空白模板",
  },
  options: ({ options }) => {
    console.log(options);
    return (
      <>
        <Form.Item label="模板标题" name="title">
          <Input />
        </Form.Item>
      </>
    );
  },
});

export default meta;
