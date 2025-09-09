import type { FunctionComponent, ReactNode } from "react";
import { useMemoizedFn } from "ahooks";

type Events<T extends Record<string, string> | undefined> = T extends Record<
  string,
  string
>
  ? {
      [Key in keyof T]: {
        action: T[Key];
        args: any;
      };
    }
  : never;

type EventCallbacks<
  T extends Record<
    string,
    {
      action: string;
      args: any;
    }
  >
> = {
  [Key in keyof T]: (
    action: T[Key]["action"],
    args: T[Key]["args"],
    ...rest: any[]
  ) => void | Promise<void>;
};

export type RendererDef = {
  options?: Record<string, any>;
  events?: Record<string, string>;
  children?: string;
};

export const defineRenderer = <T extends RendererDef>(
  Renderer: FunctionComponent<{
    options?: Partial<T["options"]>;
    events?: Partial<Events<T["events"]>>;
    children?: Partial<Record<Exclude<T["children"], undefined>, ReactNode>>;
  }>
) => Renderer;

export function useEvents<
  T extends Record<
    string,
    {
      action: string;
      args: any;
    }
  >,
  P extends EventCallbacks<T>
>(events: Partial<T> | undefined, callbacks: P) {
  type EventKey = keyof T;
  type RestProps = {
    [Key in EventKey]: P[Key] extends (
      action: T[Key]["action"],
      args: T[Key]["args"],
      ...rest: infer R
    ) => any
      ? R
      : [];
  };

  const emitEvent = async function <K extends EventKey>(
    event: K,
    ...rest: RestProps[K]
  ) {
    if (events?.[event] && callbacks[event]) {
      const { action, args } = events[event];
      return Promise.resolve(callbacks[event](action, args, ...rest));
    }
  };
  return useMemoizedFn(emitEvent) as unknown as typeof emitEvent;
}
