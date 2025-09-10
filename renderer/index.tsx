import type { Schema } from "../common/types";
import { ErrorBoundary } from "react-error-boundary";
import { Materials } from "../materials";
import { createContainer } from "../common/container";
import { useMemo, type ReactNode } from "react";

const SchemaContainer = createContainer((schema: Schema) => schema);

const UnitRenderer = ({
  id,
  type,
}: {
  id: string;
  type: "component" | "template";
}) => {
  const schema = SchemaContainer.useContainer();
  const { Component, options, events, children, name, style } = useMemo(() => {
    const { options, events, children, style } =
      type === "component" ? schema.components[id] : schema;
    const name =
      type === "component" ? schema.components[id].name : schema.template;
    const Component =
      type === "component"
        ? Materials.Components[name]
        : Materials.Templates[name];
    return { Component, options, events, children, name, style };
  }, [schema, id, type]);
  return (
    <ErrorBoundary fallback={`${name}@${id} 渲染出错`}>
      <Component
        id={id}
        data-component-id={id}
        style={style}
        options={options}
        events={events}
      >
        {(function () {
          if (!children) {
            return undefined;
          }
          const childrenElements: Record<string, ReactNode> = {};
          for (const [key, childIDs] of Object.entries(children)) {
            childrenElements[key] = childIDs
              .filter((childID) => !!schema.components[childID])
              .map((childID) => (
                <UnitRenderer key={childID} id={childID} type="component" />
              ));
          }
          return childrenElements;
        })()}
      </Component>
    </ErrorBoundary>
  );
};

export const Renderer = ({ schema }: { schema: Schema }) => {
  return (
    <ErrorBoundary fallback={<div>出错了</div>}>
      <SchemaContainer.Provider initialState={schema}>
        <UnitRenderer id={schema.template} type="template" />
      </SchemaContainer.Provider>
    </ErrorBoundary>
  );
};
