import TemplateEmpty from "@materials/templates/empty";
import Box from "@materials/components/box";
import Button from "@materials/components/button";
import { get } from "es-toolkit/compat";

const schema = {
  template: "Empty",
  children: { children: ["1", "3"] },
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
      style: { margin: 13 },
    },
  },
  options: { title: "放到分手的分手大师" },
  style: { margin: 8 },
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
          </>
        ),
      }}
    </TemplateEmpty>
  );
};
