import { createRoot } from "react-dom/client";
import "./global.css";
import { AppLayout } from "./ui/app/layout";
import { MaterialsSider } from "./ui/app/materials";
import { Previewer } from "./ui/app/previewer";
import { Configuration } from "./ui/app/configuration";
import { Header } from "./ui/app/header";
import "@ant-design/v5-patch-for-react-19";

const App = () => {
  return (
    <AppLayout
      header={<Header />}
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
