import type { Schema } from "../common/types";
import { kebabCase } from "es-toolkit/string";
import { get } from "es-toolkit/compat";

export const generateAppCode = async (schema: Schema) => {
  const materialImportStatements: Record<
    "components" | "templates",
    Record<string, string>
  > = {
    components: {},
    templates: {},
  };
  const utilsImportStatements = [`import { get } from "es-toolkit/compat"`];
  const templateName = `Template${schema.template}`;
  materialImportStatements.templates[schema.template] =
    `import ${templateName} from "@materials/templates/${kebabCase(schema.template)}"`;

  const getJsx = (componentID?: string) => {
    // 没有componentID表示是template
    const path = !!componentID ? ["components", componentID] : [];
    let componentName = !!componentID
      ? schema.components[componentID].name
      : templateName;
    if (!!componentID && !materialImportStatements.components[componentName]) {
      materialImportStatements.components[componentName] =
        `import ${componentName} from "@materials/components/${kebabCase(componentName)}"`;
    }
    return `
      <${componentName} 
        style={get(schema, ${JSON.stringify([...path, "style"])})}
        options={get(schema, ${JSON.stringify([...path, "options"])})}
        events={get(schema, ${JSON.stringify([...path, "events"])})}
      >
        ${(function () {
          const children: Record<string, string[]> =
            get(schema, [...path, "children"]) || {};
          if (!Object.keys(children).length) {
            return "";
          } else {
            const childrenElements: Record<string, string> = {};
            Object.keys(children).forEach((key) => {
              const childIds = children[key] || [];
              if (childIds.length > 0) {
                childrenElements[key] =
                  `<>${childIds.map((childID) => getJsx(childID)).join("\n")}</>`;
              }
            });
            return `{{${Object.entries(childrenElements).map(
              ([key, childrenCode]) => {
                return `${key}: ${childrenCode},\n`;
              }
            )}}}`;
          }
        })()}
      </${componentName}>
    `;
  };
  const jsxCode = getJsx();

  const importCode = [
    ...Object.values(materialImportStatements.templates),
    ...Object.values(materialImportStatements.components),
    ...utilsImportStatements,
  ].join("\n");

  const finalCode = `
    ${importCode}

    const schema = ${JSON.stringify(schema)} as any;

    export const App = () => {
      return ${jsxCode.trim()}
    }
  `;

  return finalCode;
};
