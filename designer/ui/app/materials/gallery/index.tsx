import clsx from "clsx";
import { materialMetas } from "../../../../../materials/meta";
import { useSchemaStore } from "../../../../store/schema";

let newID = 100;
const generateID = () => String(newID++);

const ComponentsGallery = () => {
  const { updateSchema } = useSchemaStore();
  return (
    <div className="flex flex-col gap-2">
      <div>单击添加组件，这里只是做demo，实际是要把组件拖到模板的组件树中</div>
      {Object.values(materialMetas.components).map((meta) => {
        return (
          <div
            onClick={() => {
              updateSchema((schema) => {
                const id = generateID();
                schema.components[id] = {
                  name: meta.name,
                  id,
                  options: meta.defaultOptions,
                };
                // 这里只是做demo，直接写死，实际是要把组件拖到模板的组件树中
                schema.children?.children.push(id);
              });
            }}
          >
            <div className="flex aspect-square justify-center items-center bg-amber-100">
              {meta.icon}
            </div>
            <div>{meta.label}</div>
          </div>
        );
      })}
    </div>
  );
};

const TemplateGallery = () => {
  const { schema, updateSchema } = useSchemaStore();
  return (
    <div className="flex flex-col gap-2">
      <div>单击选择模板</div>
      {Object.values(materialMetas.templates).map((meta) => {
        return (
          <div
            onClick={() => {
              updateSchema((schema) => {
                schema.template = meta.name;
                schema.options = meta.defaultOptions;
              });
            }}
            className={clsx(
              schema.template === meta.name && "border border-blue-500",
              "p-2 flex flex-col justify-center items-center gap-2"
            )}
          >
            <div className="flex flex-col justify-center items-center bg-cyan-300">
              {meta.icon}
            </div>
            <div>{meta.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export const Gallery = {
  Components: ComponentsGallery,
  Template: TemplateGallery,
};
