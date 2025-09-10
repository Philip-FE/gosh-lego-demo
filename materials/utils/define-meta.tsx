import type { FunctionComponent, ReactNode } from "react";
import { defineRenderer } from "./define-renderer";

// Todo: 这里得研究下，这么写会导致defineRenderer时option, events和children必须写，即使没有也要写any
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
    label: string;
    icon: ReactNode;
    desc: ReactNode;
    options?: FunctionComponent<{options?: OptionsType<R>; updateOptions?: (newOptions: OptionsType<R>) => void}>;
    events?: Required<{
      [EventKey in keyof EventsType<R>]: {
        label: string;
        actions: {
          [ActionKey in NonNullable<EventsType<R>[EventKey]>["action"]]: {
            label: string;
            args: FunctionComponent<{options?: Record<string, any>; updateOptions?: (newOptions: Record<string, any>) => void }>;
          };
        };
      };
    }>;
    children?: Record<keyof ChildrenType<R>, string>;
  }
>(renderer: R, meta: M) {
  return {
    ...meta,
    renderer,
  } as M & { renderer: R } & { name: string; type: "component" | "template" };
}
