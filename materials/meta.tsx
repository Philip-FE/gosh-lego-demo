import type { defineMeta } from "./utils/define-meta";

const componentMetaModules = import.meta.glob("./components/*/meta.tsx", {
  eager: true,
});
const templateMetaModules = import.meta.glob("./templates/*/meta.tsx", {
  eager: true,
});

type MetaType = ReturnType<typeof defineMeta>;

const components: Record<string, MetaType> = {};
const templates: Record<string, MetaType> = {};

for (const module of Object.values(componentMetaModules)) {
  const { default: meta } = module as { default: MetaType };
  if (meta.name) {
    components[meta.name] = meta;
  } else {
    console.warn("注册失败，元数据中没有name", meta);
  }
}

for (const module of Object.values(templateMetaModules)) {
  const { default: meta } = module as { default: MetaType };
  if (meta.name) {
    templates[meta.name] = meta;
  } else {
    console.warn("注册失败，元数据中没有name", meta);
  }
}

export const materialMetas = {
  components,
  templates,
};
