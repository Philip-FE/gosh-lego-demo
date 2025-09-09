import { defineRenderer } from "../../utils/define-renderer";

const Empty = defineRenderer<{
  children: "children";
}>(({ children }) => {
  return <>{children?.children}</>;
});

export default Empty;
