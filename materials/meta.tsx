import type { defineMeta } from "./utils/define-meta";
import { getName } from "./utils/get-name";

const componentMetaModules = import.meta.glob("./components/*/meta.tsx", {
  eager: true,
});
const templateMetaModules = import.meta.glob("./templates/*/meta.tsx", {
  eager: true,
});

type MetaType = ReturnType<typeof defineMeta>;

const components: Record<string, MetaType> = {};
const templates: Record<string, MetaType> = {};

for (const [path, module] of Object.entries(componentMetaModules)) {
  const { default: meta } = module as { default: MetaType };
  meta.name = getName(path, "components", "meta");
  meta.type = "component";
  components[meta.name] = meta;
}

for (const [path, module] of Object.entries(templateMetaModules)) {
  const { default: meta } = module as { default: MetaType };
  meta.name = getName(path, "templates", "meta");
  meta.type = "template";
  templates[meta.name] = meta;
}

export const materialMetas = {
  components,
  templates,
};

console.log(materialMetas);
