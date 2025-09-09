import type { FunctionComponent, ReactNode } from "react";
import { defineRenderer } from "./define-renderer";

// Todo: 这里得研究下，这么写会导致defineRenderer时option, events和children必须写，即使没有也要写undefined
type RendererType = ReturnType<typeof defineRenderer<any>>;

type OptionsType<R extends RendererType> = NonNullable<
  Parameters<R>[0]["options"]
>;
type EventsType<R extends RendererType> = NonNullable<
  Parameters<R>[0]["events"]
>;
type ChildrenType<R extends RendererType> = NonNullable<
  Parameters<R>[0]["children"]
>;

export function defineMeta<
  R extends RendererType,
  M extends {
    type: "component" | "template";
    label: string;
    icon: ReactNode;
    options?: {
      default: Required<OptionsType<R>>;
      form: FunctionComponent;
    };
    events?: Required<{
      [EventKey in keyof EventsType<R>]: {
        label: string;
        actions: {
          [ActionKey in NonNullable<EventsType<R>[EventKey]>["action"]]: {
            label: string;
            args: FunctionComponent;
          };
        };
      };
    }>;
    children?: Record<keyof ChildrenType<R>, string>;
  }
>(renderer: R, meta: M) {
  return {
    ...meta,
    name: renderer.displayName,
    renderer,
  };
}
