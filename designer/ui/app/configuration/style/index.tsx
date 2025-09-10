import { get, set } from "es-toolkit/compat";
import { useMaterialStore } from "../../../../store/material";
import { useSchemaStore } from "../../../../store/schema";
import { useMemoizedFn } from "ahooks";
import { Form, InputNumber } from "antd";
import { useEffect } from "react";

export const StylesForm = () => {
  const { schema, updateSchema } = useSchemaStore();
  const { materialType, componentID } = useMaterialStore();
  const leadKeyPath =
    materialType === "template" ? [] : ["components", componentID];
  // options
  const stylePath = [...leadKeyPath, "style"];
  const style: Record<string, any> = get(schema, stylePath);
  const updateStyle = useMemoizedFn((newStyle: Record<string, any>) => {
    updateSchema((schema) => {
      set(schema, stylePath, newStyle);
    });
  });
  const [form] = Form.useForm<Record<string, any>>();
  const onFormValuesChange = useMemoizedFn(() => {
    form
      .validateFields()
      .then((values) => {
        updateStyle(values);
      })
      .catch(() => {});
  });
  return (
    <Form
      key={
        materialType === "template"
          ? `template-${schema.template}`
          : `component-${componentID}`
      }
      form={form}
      initialValues={style}
      onValuesChange={onFormValuesChange}
    >
      <Form.Item label="外边距" name="margin">
        <InputNumber />
      </Form.Item>
    </Form>
  );
};
