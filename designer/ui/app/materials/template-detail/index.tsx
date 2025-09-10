import { materialMetas } from "../../../../../materials/meta";
import { useSchemaStore } from "../../../../store/schema";

export const TemplateDetail = () => {
  const { schema } = useSchemaStore();
  const meta = materialMetas.templates[schema.template];
  return (
    <div className="flex flex-col gap-2">
      <div>{meta.icon}</div>
      <div>{meta.label}</div>
      <div>{meta.desc}</div>
    </div>
  );
};
