import TemplateEmpty from "@materials/templates/empty";
import Box from "@materials/components/box";
import Button from "@materials/components/button";
import { get } from "es-toolkit/compat";

const schema = {
  template: "Empty",
  children: { children: ["1", "3", "9", "10"] },
  components: {
    "1": {
      id: "1",
      name: "Box",
      options: { title: "hello world" },
      events: {
        onClick: { action: "alert", args: { message: "hello world" } },
      },
      children: { children: ["2"] },
    },
    "2": {
      id: "2",
      name: "Button",
      options: { text: "click me" },
      events: {
        onClick: { action: "alert", args: { content: "clicked button" } },
      },
    },
    "3": {
      id: "3",
      name: "Button",
      options: { text: "click me" },
      events: {
        onClick: { action: "alert", args: { content: "clicked button" } },
      },
    },
    "9": { name: "Box", id: "9", options: { title: "哈哈哈哈哈哈哈哈哈哈" } },
    "10": { name: "Button", id: "10", options: {} },
  },
} as any;

export const App = () => {
  return (
    <TemplateEmpty
      style={get(schema, ["style"])}
      options={get(schema, ["options"])}
      events={get(schema, ["events"])}
    >
      {{
        children: (
          <>
            <Box
              style={get(schema, ["components", "1", "style"])}
              options={get(schema, ["components", "1", "options"])}
              events={get(schema, ["components", "1", "events"])}
            >
              {{
                children: (
                  <>
                    <Button
                      style={get(schema, ["components", "2", "style"])}
                      options={get(schema, ["components", "2", "options"])}
                      events={get(schema, ["components", "2", "events"])}
                    ></Button>
                  </>
                ),
              }}
            </Box>

            <Button
              style={get(schema, ["components", "3", "style"])}
              options={get(schema, ["components", "3", "options"])}
              events={get(schema, ["components", "3", "events"])}
            ></Button>

            <Box
              style={get(schema, ["components", "9", "style"])}
              options={get(schema, ["components", "9", "options"])}
              events={get(schema, ["components", "9", "events"])}
            >
              {{
                children: "hhhhhhh",
              }}
            </Box>

            <Button
              style={get(schema, ["components", "10", "style"])}
              options={get(schema, ["components", "10", "options"])}
              events={get(schema, ["components", "10", "events"])}
            ></Button>
          </>
        ),
      }}
    </TemplateEmpty>
  );
};
