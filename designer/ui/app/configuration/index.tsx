import { useSchemaStore } from "../../../store/schema";
import { useMaterialStore } from "../../../store/material";
import { useMemoizedFn } from "ahooks";
import { set, get } from "es-toolkit/compat";
import type { EventsConfig, OptionsConfig } from "../../../../common/types";
import { Tabs } from "antd";
import { useMemo } from "react";
import { OptionsForm } from "./options";
import { materialMetas } from "../../../../materials/meta";
import { StylesForm } from "./style";
import { EventsForm } from "./events";

export const Configuration = () => {
  const { schema } = useSchemaStore();
  const { materialType, componentID } = useMaterialStore();
  console.log({
    materialType,
    componentID,
  });
  const label =
    materialType === "template"
      ? materialMetas.templates[schema.template].label
      : materialMetas.components[schema.components[componentID]?.name]?.label;
  const tabs = useMemo(() => {
    return [
      {
        label: "配置",
        key: "options",
        children: <OptionsForm />,
      },
      {
        label: "样式",
        key: "styles",
        children: <StylesForm />,
      },
      {
        label: "事件",
        key: "events",
        children: <EventsForm />,
      },
    ];
  }, []);
  if (materialType === "component" && !componentID) {
    return <div>请选中组件</div>;
  }
  return (
    <div key={`${materialType}-${componentID}`} className="m-4">
      <Tabs
        tabBarExtraContent={<div className="text-blue-600">{label}</div>}
        items={tabs}
      ></Tabs>
    </div>
  );
};
