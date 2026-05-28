import { AppProvider, useApp } from "@/state";
import { Landing } from "@/components/layout/Landing";
import { Sidebar } from "@/components/layout/Sidebar";
import { HrDashboard } from "@/personas/hr/HrDashboard";
import { HrEmployees } from "@/personas/hr/HrEmployees";
import { HrLeave } from "@/personas/hr/HrLeave";
import { HrPayroll } from "@/personas/hr/HrPayroll";
import { HrTraining } from "@/personas/hr/HrTraining";
import { PmDashboard } from "@/personas/pm/PmDashboard";
import { PmAttendance } from "@/personas/pm/PmAttendance";
import { PmInvoices } from "@/personas/pm/PmInvoices";
import { PmReport } from "@/personas/pm/PmReport";
import { PmProjectDetail } from "@/personas/pm/PmProjectDetail";
import { DirectorDashboard } from "@/personas/director/DirectorDashboard";
import { DirectorProjects } from "@/personas/director/DirectorProjects";
import { DirectorProjectDetail } from "@/personas/director/DirectorProjectDetail";
import { DirectorFinance } from "@/personas/director/DirectorFinance";

function Router() {
  const { view } = useApp();
  if (view.kind === "landing") return <Landing />;

  if (view.kind === "hr") {
    switch (view.page) {
      case "dashboard": return <HrDashboard />;
      case "employees": return <HrEmployees />;
      case "leave":     return <HrLeave />;
      case "payroll":   return <HrPayroll />;
      case "training":  return <HrTraining />;
    }
  }
  if (view.kind === "pm") {
    switch (view.page) {
      case "dashboard":  return <PmDashboard />;
      case "attendance": return <PmAttendance />;
      case "invoices":   return <PmInvoices />;
      case "report":     return <PmReport />;
      case "project":    return <PmProjectDetail id={view.id ?? ""} />;
    }
  }
  if (view.kind === "director") {
    switch (view.page) {
      case "dashboard": return <DirectorDashboard />;
      case "projects":  return <DirectorProjects />;
      case "project":   return <DirectorProjectDetail id={view.id ?? ""} />;
      case "finance":   return <DirectorFinance />;
    }
  }
  return null;
}

function Shell() {
  const { view } = useApp();
  const showSidebar = view.kind !== "landing";
  return (
    <div className="min-h-screen bg-surface-fog text-ink font-sans">
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className="flex-1 min-w-0">
          <Router />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
