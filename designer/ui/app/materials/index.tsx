import { Button, Select } from "antd";
import { useMaterialStore } from "../../../store/material";
import { ComponentsTree } from "./components-tree";
import { TemplateDetail } from "./template-detail";
import { useState } from "react";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Gallery } from "./gallery";

export const MaterialsSider = () => {
  const { materialType, selectMaterialType } = useMaterialStore();
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="p-2 relative h-full">
      <div className="flex justify-between mb-2">
        <Select
          value={materialType}
          onChange={(val) => {
            selectMaterialType(val);
          }}
          options={[
            {
              label: "模板",
              value: "template",
            },
            {
              label: "组件",
              value: "component",
            },
          ]}
        />
        <Button
          shape="circle"
          icon={showSideBar ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          onClick={() => {
            setShowSideBar(!showSideBar);
          }}
        ></Button>
      </div>
      {materialType === "component" ? <ComponentsTree /> : <TemplateDetail />}
      {showSideBar && (
        <div className="absolute top-0 bg-blue-300 right-[-202px] w-[200px] p-5 h-full">
          {materialType === "component" ? (
            <Gallery.Components />
          ) : (
            <Gallery.Template />
          )}
        </div>
      )}
    </div>
  );
};
