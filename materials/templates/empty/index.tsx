import { defineRenderer } from "../../utils/define-renderer";

const Empty = defineRenderer<{
  options: any;
  events: any;
  children: "children";
}>("Empty", ({ children }) => {
  return <>{children?.children}</>;
});

export default Empty;
