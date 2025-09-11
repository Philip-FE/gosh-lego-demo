import { useEffect, useRef } from "react";
import { Renderer } from "../../../../renderer";
import { useSchemaStore } from "../../../store/schema";
import { createRoot } from "react-dom/client";
import { useMemoizedFn } from "ahooks";
import { useMaterialStore } from "../../../store/material";
import styles from "./index.module.css";

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

const AppRenderer = ({ contentWindow }: { contentWindow: Window | null }) => {
  const { schema } = useSchemaStore();
  const { selectComponent, componentID, materialType } = useMaterialStore();
  useEffect(() => {
    if (materialType === "component") {
      const els = contentWindow?.document.querySelectorAll(
        `[data-component-id="${componentID}"]`
      );
      if (els) {
        els.forEach((el) => {
          el.classList.add(styles.highlight);
        });
        return () => {
          els.forEach((el) => {
            el.classList.remove(styles.highlight);
          });
        };
      }
    }
  }, [materialType, componentID]);
  return (
    <div
      className="w-full h-full"
      onContextMenu={(e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const closestComponentElement = target.closest("[data-component-id]");
        if (closestComponentElement && materialType === "component") {
          const id = closestComponentElement.getAttribute("data-component-id");
          selectComponent(id!);
        }
      }}
    >
      <Renderer schema={schema} />
    </div>
  );
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
    <div className="flex flex-col h-full justify-center items-center gap-5">
      <div className="flex items-center border rounded h-9 px-5">
        <div>右击组件选中</div>
      </div>
      <div className="w-[390px] h-[80%] border rounded-2xl p-5">
        <iframe
          ref={ref}
          className="h-full w-full border"
          srcDoc={PREVIEWER_IFRAME_SRC_DOC}
          onContextMenu={(e) => {
            console.log(e);
          }}
          onLoad={() => {
            if (ref.current) {
              const contentWindow = ref.current.contentWindow;
              if (contentWindow) {
                const root = contentWindow.document.getElementById("root");
                if (root) {
                  createRoot(root).render(
                    <AppRenderer contentWindow={contentWindow} />
                  );
                  syncStyles();
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};
