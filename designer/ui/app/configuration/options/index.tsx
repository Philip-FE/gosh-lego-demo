import { get, set } from "es-toolkit/compat";
import type { OptionsConfig } from "../../../../../common/types";
import { useMaterialStore } from "../../../../store/material";
import { useSchemaStore } from "../../../../store/schema";
import { useMemoizedFn } from "ahooks";
import { Form } from "antd";
import { useMemo } from "react";
import { materialMetas } from "../../../../../materials/meta";

export const OptionsForm = () => {
  const { schema, updateSchema } = useSchemaStore();
  const { materialType, componentID } = useMaterialStore();
  const leadKeyPath =
    materialType === "template" ? [] : ["components", componentID];
  const optionsPath = [...leadKeyPath, "options"];
  const options: OptionsConfig = get(schema, optionsPath);
  const updateOptions = useMemoizedFn((newOptions: OptionsConfig) => {
    updateSchema((schema) => {
      set(schema, optionsPath, newOptions);
    });
  });
  const [form] = Form.useForm<OptionsConfig>();
  const onFormValuesChange = useMemoizedFn(() => {
    form
      .validateFields()
      .then((values) => {
        updateOptions(values);
      })
      .catch(() => {});
  });

  const FormRender = useMemo(() => {
    if (materialType === "template") {
      return materialMetas.templates[schema.template]?.options;
    } else {
      return materialMetas.components[schema.components[componentID].name]
        ?.options;
    }
  }, [materialType, schema, componentID]);
  return (
    <Form
      key={
        materialType === "template"
          ? `template-${schema.template}`
          : `component-${componentID}`
      }
      form={form}
      initialValues={options}
      onValuesChange={onFormValuesChange}
    >
      {!!FormRender && (
        <FormRender options={options} updateOptions={updateOptions} />
      )}
    </Form>
  );
};
