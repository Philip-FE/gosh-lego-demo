import { useRef } from "react";
import { Renderer } from "../../../../renderer";
import { useSchemaStore } from "../../../store/schema";
import { createRoot } from "react-dom/client";
import { useMemoizedFn } from "ahooks";

const PREVIEWER_IFRAME_SRC_DOC = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Previewer</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;

const AppRenderer = () => {
  const { schema } = useSchemaStore();
  return <Renderer schema={schema} />;
};

export const Previewer = () => {
  const ref = useRef<HTMLIFrameElement>(null);
  const syncStyles = useMemoizedFn(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const head = iframe.contentDocument?.head;
    if (!head) return;
    document
      .querySelectorAll("link[rel='stylesheet'], style")
      .forEach((node) => {
        head.appendChild(node.cloneNode(true));
      });
  });
  return (
    <iframe
      ref={ref}
      className="w-[390px] h-[80%] border rounded-2xl"
      srcDoc={PREVIEWER_IFRAME_SRC_DOC}
      onLoad={() => {
        if (ref.current) {
          const contentWindow = ref.current.contentWindow;
          if (contentWindow) {
            createRoot(contentWindow.document.getElementById("root")!).render(
              <AppRenderer />
            );
            syncStyles();
          }
        }
      }}
    />
  );
};
