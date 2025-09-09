import { createRoot } from "react-dom/client";
import "./global.css";
import { AppLayout } from "./ui/app/layout";
import { MaterialsSider } from "./ui/app/materials";
import { Previewer } from "./ui/app/previewer";
import { Configuration } from "./ui/app/configuration";

const App = () => {
  return (
    <AppLayout
      material={<MaterialsSider />}
      previewer={<Previewer />}
      configration={<Configuration />}
    />
  );
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
