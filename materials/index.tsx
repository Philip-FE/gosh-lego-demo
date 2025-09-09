import type { defineRenderer } from "./utils/define-renderer";

const componentRendererModules = import.meta.glob("./components/*/index.tsx", {
  eager: true,
});
const templateRendererModules = import.meta.glob("./templates/*/index.tsx", {
  eager: true,
});

type ComponentType = ReturnType<typeof defineRenderer<any>>;

export const Components: Record<string, ComponentType> = {};
export const Templates: Record<string, ComponentType> = {};

for (const module of Object.values(componentRendererModules)) {
  const { default: Component } = module as { default: ComponentType };
  if (Component.displayName) {
    Components[Component.displayName] = Component;
  } else {
    console.warn("注册失败，组件没有displayName", Component);
  }
}

for (const module of Object.values(templateRendererModules)) {
  const { default: Component } = module as { default: ComponentType };
  if (Component.displayName) {
    Templates[Component.displayName] = Component;
  } else {
    console.warn("注册失败，组件没有displayName", Component);
  }
}

export const Materials = {
  Components,
  Templates,
};
