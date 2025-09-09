import type { FunctionComponent, ReactNode } from "react";
import { defineRenderer } from "./define-renderer";

type RendererType = ReturnType<typeof defineRenderer<any>>;

type OptionsType<R extends RendererType> = Parameters<R>[0]["options"];
type EventsType<R extends RendererType> = Exclude<
  Parameters<R>[0]["events"],
  undefined
>;

export function defineMeta<
  R extends RendererType,
  P extends {
    type: "component" | "template";
    name: string;
    label: string;
    icon: ReactNode;
    options: {
      default: Required<Exclude<OptionsType<R>, undefined>>;
      form: FunctionComponent;
    };
    events: Required<{
      [EventKey in keyof EventsType<R>]: {
        label: string;
        actions: {
          [ActionKey in Exclude<
            EventsType<R>[EventKey],
            undefined
          >["action"]]: {
            label: string;
            args: FunctionComponent;
          };
        };
      };
    }>;
  }
>(renderer: R, meta: P) {
  return {
    ...meta,
    renderer,
  };
}
