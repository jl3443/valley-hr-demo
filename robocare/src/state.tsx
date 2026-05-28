import * as React from "react";

export type Persona = "hr" | "pm" | "director";

export type View =
  | { kind: "landing" }
  | { kind: "hr"; page: "dashboard" | "employees" | "leave" | "payroll" | "training"; id?: string }
  | { kind: "pm"; page: "dashboard" | "project" | "attendance" | "invoices" | "report"; id?: string }
  | { kind: "director"; page: "dashboard" | "projects" | "finance" | "project"; id?: string };

type Ctx = {
  view: View;
  persona: Persona | null;
  go: (v: View) => void;
  enter: (p: Persona) => void;
  exit: () => void;
};

const AppCtx = React.createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = React.useState<View>({ kind: "landing" });

  const persona: Persona | null =
    view.kind === "landing" ? null
    : view.kind === "hr" ? "hr"
    : view.kind === "pm" ? "pm"
    : "director";

  const enter = (p: Persona) =>
    setView(
      p === "hr"        ? { kind: "hr",       page: "dashboard" } :
      p === "pm"        ? { kind: "pm",       page: "dashboard" } :
                          { kind: "director", page: "dashboard" }
    );

  const exit = () => setView({ kind: "landing" });

  return (
    <AppCtx.Provider value={{ view, persona, go: setView, enter, exit }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const c = React.useContext(AppCtx);
  if (!c) throw new Error("AppProvider missing");
  return c;
}
