import type { FunctionComponent, ReactNode } from "react";
import { defineRenderer, type RendererDef } from "./define-renderer";

type RendererType = ReturnType<typeof defineRenderer<RendererDef>>;

type OptionsType<R extends RendererType> = NonNullable<
  Parameters<R>[0]["options"]
>;
type EventsType<R extends RendererType> = NonNullable<
  Parameters<R>[0]["events"]
>;
export function defineMeta<
  R extends RendererType,
  M extends {
    /**
     * 组件中文名
     */
    label: string;
    /**
     * 组件图标
     */
    icon: ReactNode;
    /**
     * 组件描述信息
     */
    desc: ReactNode;
  } & ("options" extends keyof R["rendererDef"]
    ? {
        /**
         * 组件配置表单
         */
        options: FunctionComponent<{
          options?: OptionsType<R>;
          updateOptions?: (newOptions: OptionsType<R>) => void;
        }>;
        /**
         * 组件默认配置
         */
        defaultOptions: Required<R["rendererDef"]["options"]>;
      }
    : { options?: never; defaultOptions?: never }) &
    ("events" extends keyof R["rendererDef"]
      ? {
          /**
           * 组件事件配置
           */
          events: Required<{
            /**
             * 事件名
             */
            [EventKey in keyof EventsType<R>]: {
              /**
               * 事件中文名
               */
              label: string;
              /**
               * 事件action配置
               */
              actions: {
                /**
                 * 事件action名
                 */
                [ActionKey in NonNullable<EventsType<R>[EventKey]>["action"]]: {
                  /**
                   * 事件action中文名
                   */
                  label: string;
                  /**
                   * 事件action参数表单
                   */
                  args?: FunctionComponent<{
                    args?: Record<string, any>;
                    updateArgs?: (newArgs: Record<string, any>) => void;
                  }>;
                  /**
                   * 事件action默认参数
                   */
                  defaultArgs?: Record<string, any>;
                };
              };
            };
          }>;
        }
      : { events?: never }) &
    ("children" extends keyof R["rendererDef"]
      ? {
          /**
           * 组件子插槽中文名配置
           */
          children: Record<NonNullable<R["rendererDef"]["children"]>, string>;
        }
      : { children?: never }),
>(renderer: R, meta: M) {
  return {
    ...meta,
    renderer,
  } as M & { renderer: R } & { name: string; type: "component" | "template" };
}
