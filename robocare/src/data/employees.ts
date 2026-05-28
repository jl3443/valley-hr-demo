/**
 * 30-person workforce — mix of W2 / 1099 across roles Robocare actually
 * staffs (installers, electricians, technicians, AGV engineers, PMs,
 * coordinators, finance). Salaries and PTO accruals match the role tier;
 * birthdays / hire dates spread over 2019-2024 for realistic tenure curves.
 */

export type EmployeeKind = "W2" | "1099";

export type Employee = {
  id: string;
  name: string;
  /** Display chip — e.g. "AGV Installer", "Lead Electrician". */
  role: string;
  department: "Installation" | "Engineering" | "Operations" | "Finance" | "HR" | "Project Mgmt";
  kind: EmployeeKind;
  hireDate: string;        // ISO YYYY-MM-DD
  /** USD / hour (1099) or implied hourly from monthly salary (W2). */
  hourlyRate: number;
  /** Monthly salary in USD — W2 only; 1099 leaves this 0. */
  monthlySalary: number;
  /** Per-day meal allowance USD. */
  mealAllowance: number;
  /** Accrued PTO hours available right now. */
  ptoBalance: number;
  /** PTO accrued YTD (hours). */
  ptoAccrued: number;
  /** OT hours converted into comp time (调休) available. */
  compTime: number;
  status: "Active" | "On leave" | "On project" | "Bench";
  certs: string[];
  /** Avg training score 0-100. */
  trainingScore: number;
  baseLocation: "Newark, NJ" | "Edison, NJ" | "Queens, NY" | "Tampa, FL" | "Birmingham, AL" | "Remote";
};

export const employees: Employee[] = [
  { id: "EMP-001", name: "Wang Lei",        role: "Senior PM",          department: "Project Mgmt",  kind: "W2",   hireDate: "2019-04-12", hourlyRate: 58, monthlySalary: 9700, mealAllowance: 25, ptoBalance: 96,  ptoAccrued: 160, compTime: 12, status: "On project", certs: ["PMP", "OSHA 30"],            trainingScore: 94, baseLocation: "Newark, NJ" },
  { id: "EMP-002", name: "Maria González",  role: "PM · East",          department: "Project Mgmt",  kind: "W2",   hireDate: "2020-08-03", hourlyRate: 52, monthlySalary: 8800, mealAllowance: 25, ptoBalance: 112, ptoAccrued: 144, compTime: 8,  status: "On project", certs: ["PMP", "OSHA 10"],            trainingScore: 91, baseLocation: "Queens, NY" },
  { id: "EMP-003", name: "Chen Yu",         role: "AGV Lead Engineer",  department: "Engineering",   kind: "W2",   hireDate: "2019-09-19", hourlyRate: 65, monthlySalary: 10800, mealAllowance: 25, ptoBalance: 88,  ptoAccrued: 160, compTime: 18, status: "On project", certs: ["AGV Cat-A", "OSHA 30"],      trainingScore: 96, baseLocation: "Edison, NJ" },
  { id: "EMP-004", name: "Daniel Kim",      role: "Senior Electrician", department: "Installation",  kind: "W2",   hireDate: "2021-01-11", hourlyRate: 48, monthlySalary: 8100, mealAllowance: 22, ptoBalance: 64,  ptoAccrued: 120, compTime: 22, status: "On project", certs: ["NJ Electrical · J", "OSHA 30"], trainingScore: 89, baseLocation: "Newark, NJ" },
  { id: "EMP-005", name: "Zhao Min",        role: "Project Coordinator",department: "Project Mgmt",  kind: "W2",   hireDate: "2022-03-07", hourlyRate: 38, monthlySalary: 6400, mealAllowance: 22, ptoBalance: 56,  ptoAccrued: 96,  compTime: 6,  status: "Active",    certs: ["OSHA 10"],                       trainingScore: 87, baseLocation: "Newark, NJ" },
  { id: "EMP-006", name: "James O'Connor",  role: "AGV Installer · L2", department: "Installation",  kind: "1099", hireDate: "2022-06-15", hourlyRate: 42, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 40,  ptoAccrued: 80,  compTime: 14, status: "On project", certs: ["OSHA 30", "Forklift"],       trainingScore: 85, baseLocation: "Edison, NJ" },
  { id: "EMP-007", name: "Liu Wei",         role: "AGV Installer · L1", department: "Installation",  kind: "1099", hireDate: "2023-02-20", hourlyRate: 36, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 28,  ptoAccrued: 56,  compTime: 9,  status: "On project", certs: ["OSHA 10"],                       trainingScore: 78, baseLocation: "Edison, NJ" },
  { id: "EMP-008", name: "Rohan Patel",     role: "Software Engineer",  department: "Engineering",   kind: "W2",   hireDate: "2020-11-04", hourlyRate: 60, monthlySalary: 10000, mealAllowance: 25, ptoBalance: 104, ptoAccrued: 152, compTime: 4,  status: "Active",    certs: ["AWS SA"],                        trainingScore: 93, baseLocation: "Remote" },
  { id: "EMP-009", name: "Sun Qiang",       role: "Forklift Operator",  department: "Installation",  kind: "1099", hireDate: "2023-05-08", hourlyRate: 34, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 18,  ptoAccrued: 44,  compTime: 11, status: "On project", certs: ["Forklift", "OSHA 10"],       trainingScore: 81, baseLocation: "Newark, NJ" },
  { id: "EMP-010", name: "Sarah Mitchell",  role: "Finance Analyst",    department: "Finance",       kind: "W2",   hireDate: "2021-09-13", hourlyRate: 44, monthlySalary: 7400, mealAllowance: 22, ptoBalance: 80,  ptoAccrued: 128, compTime: 2,  status: "Active",    certs: ["CPA candidate"],                 trainingScore: 92, baseLocation: "Newark, NJ" },
  { id: "EMP-011", name: "Zhang Hao",       role: "Senior Technician",  department: "Installation",  kind: "W2",   hireDate: "2020-04-21", hourlyRate: 46, monthlySalary: 7800, mealAllowance: 22, ptoBalance: 72,  ptoAccrued: 136, compTime: 16, status: "On project", certs: ["NJ Electrical · I", "OSHA 30"], trainingScore: 88, baseLocation: "Newark, NJ" },
  { id: "EMP-012", name: "Priya Sharma",    role: "HR Generalist",      department: "HR",            kind: "W2",   hireDate: "2022-01-17", hourlyRate: 40, monthlySalary: 6700, mealAllowance: 22, ptoBalance: 68,  ptoAccrued: 104, compTime: 0,  status: "Active",    certs: ["SHRM-CP"],                       trainingScore: 90, baseLocation: "Newark, NJ" },
  { id: "EMP-013", name: "Wu Jia",          role: "Field Technician",   department: "Installation",  kind: "1099", hireDate: "2023-08-30", hourlyRate: 35, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 12,  ptoAccrued: 28,  compTime: 6,  status: "On project", certs: ["OSHA 10"],                       trainingScore: 79, baseLocation: "Queens, NY" },
  { id: "EMP-014", name: "Carlos Ramírez",  role: "Site Supervisor",    department: "Installation",  kind: "W2",   hireDate: "2019-11-25", hourlyRate: 50, monthlySalary: 8400, mealAllowance: 25, ptoBalance: 120, ptoAccrued: 168, compTime: 20, status: "On project", certs: ["OSHA 30", "Aerial Lift"],    trainingScore: 91, baseLocation: "Queens, NY" },
  { id: "EMP-015", name: "Li Xuan",         role: "Project Coordinator",department: "Project Mgmt",  kind: "W2",   hireDate: "2022-07-04", hourlyRate: 36, monthlySalary: 6100, mealAllowance: 22, ptoBalance: 48,  ptoAccrued: 88,  compTime: 4,  status: "Active",    certs: ["OSHA 10"],                       trainingScore: 84, baseLocation: "Edison, NJ" },
  { id: "EMP-016", name: "Michael Brown",   role: "Aerial Lift Op.",    department: "Installation",  kind: "1099", hireDate: "2022-10-12", hourlyRate: 38, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 32,  ptoAccrued: 72,  compTime: 12, status: "On project", certs: ["Aerial Lift", "OSHA 30"],    trainingScore: 86, baseLocation: "Tampa, FL" },
  { id: "EMP-017", name: "Zhou Bin",        role: "AGV Calibration",    department: "Engineering",   kind: "W2",   hireDate: "2021-04-29", hourlyRate: 52, monthlySalary: 8800, mealAllowance: 25, ptoBalance: 84,  ptoAccrued: 128, compTime: 10, status: "On project", certs: ["AGV Cat-B"],                     trainingScore: 92, baseLocation: "Edison, NJ" },
  { id: "EMP-018", name: "Emily Davis",     role: "Office Manager",     department: "Operations",    kind: "W2",   hireDate: "2020-02-10", hourlyRate: 35, monthlySalary: 5900, mealAllowance: 22, ptoBalance: 92,  ptoAccrued: 152, compTime: 0,  status: "Active",    certs: [],                                trainingScore: 88, baseLocation: "Newark, NJ" },
  { id: "EMP-019", name: "Huang Lin",       role: "Field Technician",   department: "Installation",  kind: "1099", hireDate: "2024-01-08", hourlyRate: 33, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 4,   ptoAccrued: 12,  compTime: 2,  status: "On project", certs: ["OSHA 10"],                       trainingScore: 75, baseLocation: "Edison, NJ" },
  { id: "EMP-020", name: "Anna Petrov",     role: "Logistics Coord.",   department: "Operations",    kind: "W2",   hireDate: "2021-12-06", hourlyRate: 37, monthlySalary: 6200, mealAllowance: 22, ptoBalance: 56,  ptoAccrued: 112, compTime: 6,  status: "Active",    certs: ["OSHA 10"],                       trainingScore: 87, baseLocation: "Newark, NJ" },
  { id: "EMP-021", name: "Tang Ming",       role: "Senior Technician",  department: "Installation",  kind: "W2",   hireDate: "2020-08-22", hourlyRate: 46, monthlySalary: 7800, mealAllowance: 22, ptoBalance: 68,  ptoAccrued: 128, compTime: 14, status: "On project", certs: ["OSHA 30", "Forklift"],       trainingScore: 90, baseLocation: "Birmingham, AL" },
  { id: "EMP-022", name: "Kevin Lee",       role: "Junior Engineer",    department: "Engineering",   kind: "W2",   hireDate: "2023-06-19", hourlyRate: 40, monthlySalary: 6700, mealAllowance: 22, ptoBalance: 28,  ptoAccrued: 56,  compTime: 3,  status: "Active",    certs: [],                                trainingScore: 83, baseLocation: "Edison, NJ" },
  { id: "EMP-023", name: "Yang Fei",        role: "Field Technician",   department: "Installation",  kind: "1099", hireDate: "2023-11-14", hourlyRate: 34, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 10,  ptoAccrued: 24,  compTime: 5,  status: "On project", certs: ["OSHA 10"],                       trainingScore: 77, baseLocation: "Queens, NY" },
  { id: "EMP-024", name: "Olivia Wang",     role: "HR Coordinator",     department: "HR",            kind: "W2",   hireDate: "2023-03-27", hourlyRate: 32, monthlySalary: 5400, mealAllowance: 22, ptoBalance: 36,  ptoAccrued: 72,  compTime: 0,  status: "Active",    certs: [],                                trainingScore: 85, baseLocation: "Newark, NJ" },
  { id: "EMP-025", name: "David Thompson",  role: "Aerial Lift Op.",    department: "Installation",  kind: "1099", hireDate: "2023-04-04", hourlyRate: 38, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 22,  ptoAccrued: 64,  compTime: 8,  status: "On leave",  certs: ["Aerial Lift"],                   trainingScore: 80, baseLocation: "Birmingham, AL" },
  { id: "EMP-026", name: "Xie Bo",          role: "AGV Installer · L2", department: "Installation",  kind: "1099", hireDate: "2022-09-09", hourlyRate: 42, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 44,  ptoAccrued: 88,  compTime: 16, status: "On project", certs: ["OSHA 30"],                       trainingScore: 88, baseLocation: "Edison, NJ" },
  { id: "EMP-027", name: "Rachel Cohen",    role: "Finance Coord.",     department: "Finance",       kind: "W2",   hireDate: "2022-04-18", hourlyRate: 36, monthlySalary: 6100, mealAllowance: 22, ptoBalance: 60,  ptoAccrued: 104, compTime: 0,  status: "Active",    certs: [],                                trainingScore: 86, baseLocation: "Newark, NJ" },
  { id: "EMP-028", name: "Feng Yi",         role: "Field Technician",   department: "Installation",  kind: "1099", hireDate: "2024-02-12", hourlyRate: 33, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 0,   ptoAccrued: 8,   compTime: 1,  status: "Bench",     certs: [],                                trainingScore: 74, baseLocation: "Edison, NJ" },
  { id: "EMP-029", name: "Tyler Adams",     role: "Forklift Operator",  department: "Installation",  kind: "1099", hireDate: "2023-07-25", hourlyRate: 34, monthlySalary: 0,    mealAllowance: 22, ptoBalance: 16,  ptoAccrued: 36,  compTime: 7,  status: "On project", certs: ["Forklift", "OSHA 10"],       trainingScore: 82, baseLocation: "Tampa, FL" },
  { id: "EMP-030", name: "Deng Hua",        role: "PM · Central",       department: "Project Mgmt",  kind: "W2",   hireDate: "2021-05-30", hourlyRate: 52, monthlySalary: 8800, mealAllowance: 25, ptoBalance: 80,  ptoAccrued: 128, compTime: 6,  status: "On project", certs: ["PMP", "OSHA 30"],            trainingScore: 92, baseLocation: "Birmingham, AL" },
];

export const employeeById = (id: string) => employees.find((e) => e.id === id);

/** KPI helpers used across the HR persona. */
export const workforceStats = {
  total:      employees.length,
  w2:         employees.filter((e) => e.kind === "W2").length,
  c1099:      employees.filter((e) => e.kind === "1099").length,
  onProject:  employees.filter((e) => e.status === "On project").length,
  onLeave:    employees.filter((e) => e.status === "On leave").length,
  bench:      employees.filter((e) => e.status === "Bench").length,
  avgPto:     Math.round(employees.reduce((a, e) => a + e.ptoBalance, 0) / employees.length),
  avgTraining: Math.round(employees.reduce((a, e) => a + e.trainingScore, 0) / employees.length),
};
