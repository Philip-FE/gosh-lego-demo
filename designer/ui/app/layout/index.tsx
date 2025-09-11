import type { ReactNode } from "react";

export const AppLayout = (props: {
  header: ReactNode;
  material: ReactNode;
  previewer: ReactNode;
  configration: ReactNode;
}) => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <header className="bg-amber-200 border-b-2 h-15">{props.header}</header>
      <main className="flex flex-1">
        <aside className="flex-10 bg-red-100 border-r-2">
          {props.material}
        </aside>
        <div className="flex-30 flex justify-center items-center">
          {props.previewer}
        </div>
        <aside className="flex-20 bg-blue-50 border-l-2">
          {props.configration}
        </aside>
      </main>
    </div>
  );
};
