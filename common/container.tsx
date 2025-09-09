/**
 * 用于简化Context的创建和使用
 */
import React from "react";

const EMPTY: unique symbol = Symbol();

export interface ContainerProviderProps<State = void> {
  initialState?: State;
  children?: React.ReactNode;
}

export interface Container<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

export function createContainer<Value, State = void>(
  useHook: (initialState: State) => Value
): Container<Value, State>;
export function createContainer<Value, State = void>(
  useHook: () => Value
): Container<Value, State>;
export function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value
): Container<Value, State> {
  const Context = React.createContext<Value | typeof EMPTY>(EMPTY);

  function Provider(props: ContainerProviderProps<State>) {
    const value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useContainer(): Value {
    const value = React.useContext(Context);
    if (value === EMPTY) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }
    return value;
  }

  return { Provider, useContainer };
}

export function useContainer<Value, State = void>(
  container: Container<Value, State>
): Value {
  return container.useContainer();
}

export const ContainerProviders = (props: {
  providers: Array<
    React.ReactElement<React.ComponentType<ContainerProviderProps<unknown>>>
  >;
  children?: React.ReactNode;
}) => {
  const { providers = [], children = null } = props;
  if (providers.length === 0) {
    return children;
  } else {
    const [curElement, ...childrenElements] = providers;
    return React.cloneElement(
      curElement,
      curElement.props,
      <ContainerProviders providers={childrenElements}>
        {children}
      </ContainerProviders>
    );
  }
};
