import type { defineRenderer } from "./utils/define-renderer";
import { getName } from "./utils/get-name";

const componentRendererModules = import.meta.glob("./components/*/index.tsx", {
  eager: true,
});
const templateRendererModules = import.meta.glob("./templates/*/index.tsx", {
  eager: true,
});

type ComponentType = ReturnType<typeof defineRenderer<any>>;

export const Components: Record<string, ComponentType> = {};
export const Templates: Record<string, ComponentType> = {};

for (const [path, module] of Object.entries(componentRendererModules)) {
  const { default: Component } = module as { default: ComponentType };
  Component.displayName = getName(path, "components", "index");
  Components[Component.displayName] = Component;
}

for (const [path, module] of Object.entries(templateRendererModules)) {
  const { default: Component } = module as { default: ComponentType };
  Component.displayName = getName(path, "templates", "index");
  Templates[Component.displayName] = Component;
}

export const Materials = {
  Components,
  Templates,
};

console.log(Materials);
