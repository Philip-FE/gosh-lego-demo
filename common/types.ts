export type ID = string;

export type EventKey = string;

export type ActionKey = string;

export type ArgsType = Record<string, any>;

export type OptionsConfig = Record<string, any>;

export type EventsConfig = Record<
  EventKey,
  {
    action: ActionKey;
    args: ArgsType;
  }
>;

export interface Schema {
  // 模板名
  template: string;
  // 模板配置
  options?: OptionsConfig;
  // 模板样式
  style?: Record<string, any>;
  // 模板事件
  events?: EventsConfig;
  // 组件在模板中的排列布局
  children?: Record<string, ID[]>;
  // 组件配置
  components: Record<
    ID,
    {
      id: ID;
      name: string;
      style?: Record<string, any>;
      options?: OptionsConfig;
      events?: EventsConfig;
      children?: Record<string, ID[]>;
    }
  >;
}
