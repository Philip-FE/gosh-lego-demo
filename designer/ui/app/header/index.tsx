import { Button } from "antd";
import { useSchemaStore } from "../../../store/schema";
import copy from "copy-to-clipboard";
import { message } from "antd";
import { generateAppCode } from "@generator/generateAppCode";

export const Header = () => {
  const { schema } = useSchemaStore();
  return (
    <div className="flex justify-center items-center gap-7 h-full">
      <div>在Header区域做历史记录 / 保存 / 发布 等功能</div>
      <Button
        onClick={() => {
          copy(JSON.stringify(schema, null, 2));
          message.success(
            "复制成功，把内容粘贴到app/no-treeshaking-renderer/schema.json"
          );
        }}
      >
        复制schema
      </Button>
      <Button
        onClick={() => {
          window.open("/no-tree-shaking-renderer.html");
        }}
      >
        查看应用（无treeshaking）
      </Button>
      <Button
        type="primary"
        onClick={async () => {
          const code = await generateAppCode(schema);
          copy(code);
          message.success("复制成功，把内容粘贴到apps/demo/app.tsx");
        }}
      >
        复制代码
      </Button>
      <Button
        type="primary"
        onClick={() => {
          window.open("/tree-shaking-renderer.html");
        }}
      >
        查看应用（treeshaking）
      </Button>
    </div>
  );
};
