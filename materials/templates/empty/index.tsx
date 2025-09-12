import { defineRenderer } from "../../utils/define-renderer";

const Empty = defineRenderer<{
  options: {
    title: string;
  };
  children: "children";
}>(({ style = {}, options, children, className }) => {
  return (
    <div style={style} className={className}>
      {options?.title && <div>{options?.title}</div>}
      {children?.children}
    </div>
  );
});

export default Empty;
