import { defineRenderer, useEvents } from "../../utils/define-renderer";

const Box = defineRenderer<{
  options: {
    title: string;
  };
  events: {
    onClick: "jumpUrl" | "jumpGoogle" | "alert";
  };
  children: "children";
}>("Box", ({ style = {}, options, events, children, ...rest }) => {
  const emit = useEvents(events, {
    onClick: (action, args) => {
      switch (action) {
        case "jumpUrl":
          const jumpUrlArgs = args as { url: string };
          window.open(`${jumpUrlArgs.url}`);
          break;
        case "jumpGoogle":
          window.open("https://www.google.com");
          break;
        case "alert":
          const alertArgs = args as { message: string };
          alert(alertArgs.message);
          break;
        default:
          break;
      }
    },
  });
  return (
    <div
      style={{
        ...style,
      }}
      className="flex flex-col bg-cyan-100"
      onClick={() => {
        console.log("hhhhh");
        emit("onClick");
      }}
      {...rest}
    >
      {options?.title && <div>{options.title}</div>}
      {children?.children}
    </div>
  );
});

export default Box;
