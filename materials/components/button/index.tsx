import { defineRenderer, useEvents } from "../../utils/define-renderer";

const Button = defineRenderer<{
  options: {
    text: string;
  };
  events: {
    onClick: "alert";
  };
}>(({ style = {}, options, events, ...rest }) => {
  const emit = useEvents(events, {
    onClick: (action, args: { content: string }, e: React.MouseEvent) => {
      e.stopPropagation();
      if (action === "alert") {
        alert(args.content);
      }
    },
  });
  return (
    <button
      className="border rounded-md bg-amber-600"
      style={style}
      onClick={(e) => {
        emit("onClick", e);
      }}
      {...rest}
    >
      {options?.text || "按钮"}
    </button>
  );
});

export default Button;
