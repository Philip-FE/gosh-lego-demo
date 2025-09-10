import { get } from "es-toolkit/compat";
import type { Schema } from "../../../../../common/types";
import { useSchemaStore } from "../../../../store/schema";
import { materialMetas } from "../../../../../materials/meta";
import { useMemo } from "react";
import { HolderOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { useMemoizedFn } from "ahooks";
import { useMaterialStore } from "../../../../store/material";

const getTreeData = (schema: Schema, id?: string): any => {
  const path = !!id ? ["components", id] : [];
  const children: Record<string, string[]> = get(schema, [...path, "children"]);
  const meta = !!id
    ? materialMetas.components[schema.components[id].name]
    : materialMetas.templates[schema.template];
  return {
    title: meta.label,
    key: id || schema.template,
    icon: <HolderOutlined />,
    children:
      children &&
      Object.entries(children).map(([name, childrenIDs]) => {
        return {
          title: meta.children?.[name],
          key: `${id || schema.template}-children-${name}`,
          disabled: true,
          children: childrenIDs.map((childID) => getTreeData(schema, childID)),
        };
      }),
  };
};

export const ComponentsTree = () => {
  const { schema } = useSchemaStore();
  const { selectComponent } = useMaterialStore();
  const getTreeData = useMemoizedFn((id?: string): any => {
    const path = !!id ? ["components", id] : [];
    const children: Record<string, string[]> = get(schema, [
      ...path,
      "children",
    ]);
    const meta = !!id
      ? materialMetas.components[schema.components[id].name]
      : materialMetas.templates[schema.template];
    return {
      title: (
        <div
          onClick={() => {
            selectComponent(id!);
          }}
        >
          {meta.label}
        </div>
      ),
      key: id || schema.template,
      icon: <HolderOutlined />,
      children:
        children &&
        Object.entries(children).map(([name, childrenIDs]) => {
          return {
            title: meta.children?.[name],
            key: `${id || schema.template}-children-${name}`,
            disabled: true,
            children: childrenIDs.map((childID) => getTreeData(childID)),
          };
        }),
    };
  });
  const treeData = useMemo(() => {
    return getTreeData();
  }, [schema, getTreeData]);
  return (
    treeData.children.length > 0 && (
      <Tree
        className="bg-transparent"
        treeData={treeData.children}
        defaultExpandAll
      />
    )
  );
};
