import { Renderer } from "@renderer";
import schema from "./schema.json";

export const App = () => {
  return <Renderer schema={schema} />;
};
