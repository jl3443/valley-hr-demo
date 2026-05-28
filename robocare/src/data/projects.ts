/**
 * Projects — Robocare serves multiple clients, so each project carries a
 * `clientId`. Headcount + dates are real-ish so the HR / PM / Director
 * dashboards stay coherent (labor cost is derived from assignments).
 */

export type Client = {
  id: string;
  name: string;
  industry: string;
  flag: string;
};

export const clients: Client[] = [
  { id: "CLT-A", name: "Atlas Logistics",        industry: "Warehousing & 3PL",   flag: "🏭" },
  { id: "CLT-B", name: "BlueRiver Manufacturing", industry: "Auto parts",          flag: "⚙️" },
  { id: "CLT-C", name: "CedarMart Distribution",  industry: "Retail distribution", flag: "📦" },
  { id: "CLT-D", name: "DeepCold Storage",        industry: "Cold chain",          flag: "❄️" },
  { id: "CLT-E", name: "EastBay Hotels",          industry: "Hospitality FF&E",    flag: "🏨" },
];

export type ProjectStatus = "Planned" | "In Progress" | "On Hold" | "Completed";

export type Project = {
  id: string;
  name: string;
  clientId: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  pmId: string;          // employees.ts id
  teamIds: string[];     // employees.ts ids
  location: string;
  /** $ budget for entire project. */
  budget: number;
  /** $ spent across labor / travel / equipment / reimbursable. */
  spent: number;
  spendByCategory: {
    labor: number;
    travel: number;
    equipment: number;
    invoices: number;
  };
  /** Q-by-Q breakdown. Only quarters that have spend. */
  spendByQuarter: { quarter: string; amount: number }[];
  progress: number; // 0-100
};

export const projects: Project[] = [
  {
    id: "PRJ-2401",
    name: "Atlas Newark · AGV cell rollout",
    clientId: "CLT-A",
    startDate: "2025-01-08",
    endDate: "2025-09-30",
    status: "In Progress",
    pmId: "EMP-001",
    teamIds: ["EMP-001", "EMP-003", "EMP-004", "EMP-006", "EMP-007", "EMP-009", "EMP-011", "EMP-017", "EMP-026"],
    location: "Newark, NJ",
    budget: 720_000,
    spent: 482_300,
    spendByCategory: { labor: 318_000, travel: 42_500, equipment: 88_600, invoices: 33_200 },
    spendByQuarter: [
      { quarter: "Q1 2025", amount: 142_300 },
      { quarter: "Q2 2025", amount: 198_000 },
      { quarter: "Q3 2025", amount: 142_000 },
    ],
    progress: 68,
  },
  {
    id: "PRJ-2402",
    name: "BlueRiver Edison · forklift fleet refit",
    clientId: "CLT-B",
    startDate: "2025-02-14",
    endDate: "2025-08-15",
    status: "In Progress",
    pmId: "EMP-002",
    teamIds: ["EMP-002", "EMP-009", "EMP-014", "EMP-016", "EMP-021", "EMP-029"],
    location: "Edison, NJ",
    budget: 340_000,
    spent: 251_400,
    spendByCategory: { labor: 168_400, travel: 22_800, equipment: 41_200, invoices: 19_000 },
    spendByQuarter: [
      { quarter: "Q1 2025", amount: 68_400 },
      { quarter: "Q2 2025", amount: 124_000 },
      { quarter: "Q3 2025", amount: 59_000 },
    ],
    progress: 74,
  },
  {
    id: "PRJ-2403",
    name: "CedarMart Queens · loading-dock automation",
    clientId: "CLT-C",
    startDate: "2025-03-03",
    endDate: "2025-11-20",
    status: "In Progress",
    pmId: "EMP-002",
    teamIds: ["EMP-002", "EMP-013", "EMP-014", "EMP-022", "EMP-023"],
    location: "Queens, NY",
    budget: 420_000,
    spent: 196_700,
    spendByCategory: { labor: 124_700, travel: 28_400, equipment: 28_600, invoices: 15_000 },
    spendByQuarter: [
      { quarter: "Q1 2025", amount: 38_700 },
      { quarter: "Q2 2025", amount: 92_000 },
      { quarter: "Q3 2025", amount: 66_000 },
    ],
    progress: 46,
  },
  {
    id: "PRJ-2404",
    name: "DeepCold Birmingham · cold-aisle AGV",
    clientId: "CLT-D",
    startDate: "2024-11-04",
    endDate: "2025-07-10",
    status: "In Progress",
    pmId: "EMP-030",
    teamIds: ["EMP-030", "EMP-021", "EMP-025", "EMP-016", "EMP-029"],
    location: "Birmingham, AL",
    budget: 560_000,
    spent: 421_900,
    spendByCategory: { labor: 268_900, travel: 64_800, equipment: 62_000, invoices: 26_200 },
    spendByQuarter: [
      { quarter: "Q4 2024", amount: 88_000 },
      { quarter: "Q1 2025", amount: 156_900 },
      { quarter: "Q2 2025", amount: 177_000 },
    ],
    progress: 78,
  },
  {
    id: "PRJ-2405",
    name: "EastBay Tampa · hotel FF&E rollout",
    clientId: "CLT-E",
    startDate: "2025-04-22",
    endDate: "2025-10-30",
    status: "In Progress",
    pmId: "EMP-030",
    teamIds: ["EMP-030", "EMP-016", "EMP-025", "EMP-029"],
    location: "Tampa, FL",
    budget: 280_000,
    spent: 102_400,
    spendByCategory: { labor: 64_400, travel: 24_000, equipment: 8_200, invoices: 5_800 },
    spendByQuarter: [
      { quarter: "Q2 2025", amount: 58_400 },
      { quarter: "Q3 2025", amount: 44_000 },
    ],
    progress: 32,
  },
  {
    id: "PRJ-2406",
    name: "Atlas Edison · AS/RS phase 2",
    clientId: "CLT-A",
    startDate: "2025-06-01",
    endDate: "2026-02-28",
    status: "In Progress",
    pmId: "EMP-001",
    teamIds: ["EMP-001", "EMP-003", "EMP-017", "EMP-022", "EMP-007", "EMP-026"],
    location: "Edison, NJ",
    budget: 880_000,
    spent: 148_900,
    spendByCategory: { labor: 92_900, travel: 16_000, equipment: 32_000, invoices: 8_000 },
    spendByQuarter: [
      { quarter: "Q2 2025", amount: 38_900 },
      { quarter: "Q3 2025", amount: 110_000 },
    ],
    progress: 18,
  },
  {
    id: "PRJ-2407",
    name: "BlueRiver QC line · pilot",
    clientId: "CLT-B",
    startDate: "2025-08-01",
    endDate: "2025-12-15",
    status: "Planned",
    pmId: "EMP-002",
    teamIds: ["EMP-002", "EMP-008", "EMP-022"],
    location: "Edison, NJ",
    budget: 180_000,
    spent: 0,
    spendByCategory: { labor: 0, travel: 0, equipment: 0, invoices: 0 },
    spendByQuarter: [],
    progress: 5,
  },
  {
    id: "PRJ-2310",
    name: "CedarMart Newark · ASRS retrofit",
    clientId: "CLT-C",
    startDate: "2024-02-12",
    endDate: "2024-12-20",
    status: "Completed",
    pmId: "EMP-001",
    teamIds: ["EMP-001", "EMP-003", "EMP-011", "EMP-006", "EMP-014"],
    location: "Newark, NJ",
    budget: 520_000,
    spent: 488_900,
    spendByCategory: { labor: 312_400, travel: 44_500, equipment: 78_000, invoices: 54_000 },
    spendByQuarter: [
      { quarter: "Q1 2024", amount: 74_900 },
      { quarter: "Q2 2024", amount: 132_000 },
      { quarter: "Q3 2024", amount: 168_000 },
      { quarter: "Q4 2024", amount: 114_000 },
    ],
    progress: 100,
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);
export const clientById  = (id: string) => clients.find((c) => c.id === id);

/** Director-level rollups. */
export const portfolioStats = {
  active: projects.filter((p) => p.status === "In Progress").length,
  planned: projects.filter((p) => p.status === "Planned").length,
  completed: projects.filter((p) => p.status === "Completed").length,
  totalSpendYtd: projects.filter((p) => p.status !== "Completed")
    .reduce((a, p) => a + p.spent, 0),
  budgetTotal: projects.filter((p) => p.status !== "Completed")
    .reduce((a, p) => a + p.budget, 0),
  spendByCategoryYtd: projects
    .filter((p) => p.status !== "Completed")
    .reduce(
      (a, p) => ({
        labor: a.labor + p.spendByCategory.labor,
        travel: a.travel + p.spendByCategory.travel,
        equipment: a.equipment + p.spendByCategory.equipment,
        invoices: a.invoices + p.spendByCategory.invoices,
      }),
      { labor: 0, travel: 0, equipment: 0, invoices: 0 },
    ),
};
