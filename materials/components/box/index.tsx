import { defineRenderer, useEvents } from "../../utils/define-renderer";

export default defineRenderer<{
  options: {
    title: string;
  };
  events: {
    onClick: "jumpUrl" | "jumpGoogle";
  };
  children: "children";
}>(({ options, events, children }) => {
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
      }
    },
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => {
        emit("onClick");
      }}
    >
      {options?.title && <div>{options.title}</div>}
      {children?.children}
    </div>
  );
});
