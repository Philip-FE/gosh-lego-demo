import Empty from "./index";
import { defineMeta } from "../../utils/define-meta";

const meta = defineMeta(Empty, {
  name: "Empty",
  type: "template",
  label: "空白模板",
  icon: <div>空白模板</div>,
  children: {
    children: "内容",
  },
});

export default meta;
