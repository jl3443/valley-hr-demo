/**
 * Attendance, leave, invoices, daily reports — all cross-referenced to
 * employees.ts and projects.ts so the dashboards line up.
 */

export type AttendanceRow = {
  id: string;
  date: string;          // YYYY-MM-DD
  projectId: string;
  employeeId: string;
  regularHours: number;
  otHours: number;
  meal: boolean;
  enteredBy: string;     // PM employeeId
};

/* Today is treated as 2025-05-27 for the demo. */
const TODAY = "2025-05-27";

export const attendance: AttendanceRow[] = [
  // Today — Newark AGV cell (PRJ-2401, PM EMP-001)
  { id: "ATT-3001", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-003", regularHours: 8, otHours: 1.5, meal: true, enteredBy: "EMP-001" },
  { id: "ATT-3002", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-004", regularHours: 8, otHours: 2,   meal: true, enteredBy: "EMP-001" },
  { id: "ATT-3003", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-006", regularHours: 8, otHours: 0,   meal: true, enteredBy: "EMP-001" },
  { id: "ATT-3004", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-007", regularHours: 8, otHours: 0,   meal: true, enteredBy: "EMP-001" },
  { id: "ATT-3005", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-009", regularHours: 8, otHours: 1,   meal: true, enteredBy: "EMP-001" },
  { id: "ATT-3006", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-011", regularHours: 8, otHours: 1.5, meal: true, enteredBy: "EMP-001" },
  { id: "ATT-3007", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-017", regularHours: 8, otHours: 0,   meal: true, enteredBy: "EMP-001" },
  { id: "ATT-3008", date: TODAY, projectId: "PRJ-2401", employeeId: "EMP-026", regularHours: 8, otHours: 0.5, meal: true, enteredBy: "EMP-001" },

  // Today — BlueRiver Edison forklift refit (PRJ-2402, PM EMP-002)
  { id: "ATT-3010", date: TODAY, projectId: "PRJ-2402", employeeId: "EMP-009", regularHours: 4, otHours: 0, meal: false, enteredBy: "EMP-002" },
  { id: "ATT-3011", date: TODAY, projectId: "PRJ-2402", employeeId: "EMP-014", regularHours: 8, otHours: 1, meal: true,  enteredBy: "EMP-002" },
  { id: "ATT-3012", date: TODAY, projectId: "PRJ-2402", employeeId: "EMP-016", regularHours: 8, otHours: 0, meal: true,  enteredBy: "EMP-002" },
  { id: "ATT-3013", date: TODAY, projectId: "PRJ-2402", employeeId: "EMP-021", regularHours: 8, otHours: 2, meal: true,  enteredBy: "EMP-002" },
  { id: "ATT-3014", date: TODAY, projectId: "PRJ-2402", employeeId: "EMP-029", regularHours: 8, otHours: 0, meal: true,  enteredBy: "EMP-002" },

  // Today — DeepCold Birmingham (PRJ-2404, PM EMP-030)
  { id: "ATT-3020", date: TODAY, projectId: "PRJ-2404", employeeId: "EMP-021", regularHours: 8, otHours: 2,   meal: true, enteredBy: "EMP-030" },
  { id: "ATT-3021", date: TODAY, projectId: "PRJ-2404", employeeId: "EMP-016", regularHours: 8, otHours: 0,   meal: true, enteredBy: "EMP-030" },
  { id: "ATT-3022", date: TODAY, projectId: "PRJ-2404", employeeId: "EMP-029", regularHours: 8, otHours: 1.5, meal: true, enteredBy: "EMP-030" },

  // Yesterday — Atlas Newark
  { id: "ATT-2901", date: "2025-05-26", projectId: "PRJ-2401", employeeId: "EMP-003", regularHours: 8, otHours: 1, meal: true, enteredBy: "EMP-001" },
  { id: "ATT-2902", date: "2025-05-26", projectId: "PRJ-2401", employeeId: "EMP-004", regularHours: 8, otHours: 0, meal: true, enteredBy: "EMP-001" },
  { id: "ATT-2903", date: "2025-05-26", projectId: "PRJ-2401", employeeId: "EMP-011", regularHours: 8, otHours: 2, meal: true, enteredBy: "EMP-001" },
];

export type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";
export type LeaveType = "PTO" | "Sick" | "Comp time" | "Unpaid";

export type LeaveRequest = {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  hours: number;
  status: LeaveStatus;
  reason: string;
  submittedAt: string;
  approver?: string;
};

export const leaveRequests: LeaveRequest[] = [
  { id: "LV-401", employeeId: "EMP-006", type: "PTO",        startDate: "2025-06-02", endDate: "2025-06-04", hours: 24, status: "Pending",   reason: "Family event",            submittedAt: "2025-05-26" },
  { id: "LV-402", employeeId: "EMP-004", type: "Comp time",  startDate: "2025-05-30", endDate: "2025-05-30", hours: 8,  status: "Pending",   reason: "Comp from OT week 21",    submittedAt: "2025-05-27" },
  { id: "LV-403", employeeId: "EMP-011", type: "Sick",       startDate: "2025-05-22", endDate: "2025-05-22", hours: 8,  status: "Approved",  reason: "Medical appointment",     submittedAt: "2025-05-22", approver: "EMP-012" },
  { id: "LV-404", employeeId: "EMP-025", type: "PTO",        startDate: "2025-05-26", endDate: "2025-05-30", hours: 40, status: "Approved",  reason: "Vacation · DR",           submittedAt: "2025-05-12", approver: "EMP-012" },
  { id: "LV-405", employeeId: "EMP-009", type: "PTO",        startDate: "2025-06-09", endDate: "2025-06-10", hours: 16, status: "Pending",   reason: "Cousin's wedding",        submittedAt: "2025-05-25" },
  { id: "LV-406", employeeId: "EMP-014", type: "PTO",        startDate: "2025-07-14", endDate: "2025-07-18", hours: 40, status: "Pending",   reason: "Summer vacation",         submittedAt: "2025-05-21" },
  { id: "LV-407", employeeId: "EMP-018", type: "Sick",       startDate: "2025-05-15", endDate: "2025-05-15", hours: 8,  status: "Approved",  reason: "Flu",                     submittedAt: "2025-05-15", approver: "EMP-012" },
  { id: "LV-408", employeeId: "EMP-022", type: "Unpaid",     startDate: "2025-06-23", endDate: "2025-06-27", hours: 40, status: "Pending",   reason: "Personal",                submittedAt: "2025-05-20" },
  { id: "LV-409", employeeId: "EMP-027", type: "PTO",        startDate: "2025-08-04", endDate: "2025-08-08", hours: 40, status: "Pending",   reason: "Family vacation",         submittedAt: "2025-05-18" },
  { id: "LV-410", employeeId: "EMP-021", type: "PTO",        startDate: "2025-04-21", endDate: "2025-04-25", hours: 40, status: "Approved",  reason: "Vacation",                submittedAt: "2025-04-01", approver: "EMP-012" },
  { id: "LV-411", employeeId: "EMP-029", type: "Sick",       startDate: "2025-05-19", endDate: "2025-05-20", hours: 16, status: "Approved",  reason: "Medical",                 submittedAt: "2025-05-19", approver: "EMP-012" },
  { id: "LV-412", employeeId: "EMP-013", type: "PTO",        startDate: "2025-06-30", endDate: "2025-07-01", hours: 16, status: "Rejected",  reason: "Last-minute · staffing",  submittedAt: "2025-05-24", approver: "EMP-012" },
];

export type InvoiceCategory = "Travel" | "Equipment" | "Reimbursable" | "Materials" | "Lodging";

export type Invoice = {
  id: string;
  projectId: string;
  category: InvoiceCategory;
  vendor: string;
  amount: number;
  date: string;
  uploader: string; // PM employeeId
  ocrConfidence: number; // 0-100
  status: "OCR pending" | "Pending review" | "Approved" | "Disputed";
  fileName: string;
};

export const invoices: Invoice[] = [
  { id: "INV-7001", projectId: "PRJ-2401", category: "Equipment",    vendor: "United Rentals",            amount: 4_280.00, date: "2025-05-22", uploader: "EMP-001", ocrConfidence: 98, status: "Approved",        fileName: "ur-aerial-may.pdf" },
  { id: "INV-7002", projectId: "PRJ-2401", category: "Travel",       vendor: "Marriott Newark",            amount: 1_842.00, date: "2025-05-25", uploader: "EMP-001", ocrConfidence: 96, status: "Pending review",  fileName: "marriott-week21.pdf" },
  { id: "INV-7003", projectId: "PRJ-2401", category: "Materials",    vendor: "Home Depot Pro",             amount: 612.45,   date: "2025-05-26", uploader: "EMP-001", ocrConfidence: 92, status: "Approved",        fileName: "hdpro-rcpt-may26.jpg" },
  { id: "INV-7004", projectId: "PRJ-2402", category: "Equipment",    vendor: "Sunbelt Rentals",            amount: 3_120.00, date: "2025-05-20", uploader: "EMP-002", ocrConfidence: 95, status: "Approved",        fileName: "sunbelt-forklift.pdf" },
  { id: "INV-7005", projectId: "PRJ-2402", category: "Reimbursable", vendor: "FedEx Freight",              amount: 884.20,   date: "2025-05-24", uploader: "EMP-002", ocrConfidence: 88, status: "Pending review",  fileName: "fedex-freight-may.pdf" },
  { id: "INV-7006", projectId: "PRJ-2403", category: "Lodging",      vendor: "Hilton Queens",              amount: 2_340.00, date: "2025-05-19", uploader: "EMP-002", ocrConfidence: 97, status: "Approved",        fileName: "hilton-queens-week20.pdf" },
  { id: "INV-7007", projectId: "PRJ-2403", category: "Materials",    vendor: "Grainger",                   amount: 1_204.66, date: "2025-05-23", uploader: "EMP-002", ocrConfidence: 84, status: "OCR pending",     fileName: "grainger-rcpt-may23.jpg" },
  { id: "INV-7008", projectId: "PRJ-2404", category: "Travel",       vendor: "Delta Airlines",             amount: 1_960.00, date: "2025-05-12", uploader: "EMP-030", ocrConfidence: 99, status: "Approved",        fileName: "delta-bham-may.pdf" },
  { id: "INV-7009", projectId: "PRJ-2404", category: "Equipment",    vendor: "Cat Rental Store",           amount: 5_420.00, date: "2025-05-15", uploader: "EMP-030", ocrConfidence: 96, status: "Approved",        fileName: "cat-rental-may.pdf" },
  { id: "INV-7010", projectId: "PRJ-2404", category: "Lodging",      vendor: "Hampton Inn Birmingham",     amount: 3_280.00, date: "2025-05-21", uploader: "EMP-030", ocrConfidence: 95, status: "Pending review",  fileName: "hampton-bham-week21.pdf" },
  { id: "INV-7011", projectId: "PRJ-2404", category: "Reimbursable", vendor: "Lyft business",              amount: 248.75,   date: "2025-05-26", uploader: "EMP-030", ocrConfidence: 90, status: "Pending review",  fileName: "lyft-may26.pdf" },
  { id: "INV-7012", projectId: "PRJ-2405", category: "Travel",       vendor: "American Airlines",          amount: 1_320.00, date: "2025-05-08", uploader: "EMP-030", ocrConfidence: 98, status: "Approved",        fileName: "aa-tampa-may.pdf" },
  { id: "INV-7013", projectId: "PRJ-2406", category: "Equipment",    vendor: "Sunbelt Rentals",            amount: 6_180.00, date: "2025-05-18", uploader: "EMP-001", ocrConfidence: 97, status: "Approved",        fileName: "sunbelt-edison-may.pdf" },
  { id: "INV-7014", projectId: "PRJ-2401", category: "Reimbursable", vendor: "Atlas Logistics · per diem", amount: 1_100.00, date: "2025-05-09", uploader: "EMP-001", ocrConfidence: 86, status: "Disputed",        fileName: "atlas-perdiem-may.pdf" },
  { id: "INV-7015", projectId: "PRJ-2402", category: "Materials",    vendor: "McMaster-Carr",              amount: 2_040.30, date: "2025-05-13", uploader: "EMP-002", ocrConfidence: 94, status: "Approved",        fileName: "mcmaster-rcpt-may13.pdf" },
];

export type DailyReport = {
  id: string;
  projectId: string;
  date: string;
  authorId: string;
  inProgress: string[];
  completed: string[];
  futurePlans: string[];
  risks?: string;
};

export const dailyReports: DailyReport[] = [
  {
    id: "DR-2401-127",
    projectId: "PRJ-2401",
    date: TODAY,
    authorId: "EMP-001",
    inProgress: [
      "AGV cell 2 — laser scanner alignment (Chen Yu + Liu Wei)",
      "Charging dock #4 wiring — final loom routing",
      "Pre-commissioning safety walk · zone B",
    ],
    completed: [
      "Floor magnetic strip · zone A 100%",
      "Fleet manager server stand-up",
      "OSHA 30 toolbox talk · all on-site staff",
    ],
    futurePlans: [
      "Tue: integrate Atlas WMS handshake test",
      "Wed-Thu: live load handoff dry run",
      "Fri: client SAT walk-through",
    ],
    risks: "Atlas IT delivery for WMS API delayed by 1 day — may push SAT to Mon.",
  },
  {
    id: "DR-2402-082",
    projectId: "PRJ-2402",
    date: TODAY,
    authorId: "EMP-002",
    inProgress: [
      "Forklift fleet #5-8 telemetry retrofit",
      "Operator training · cohort 2",
    ],
    completed: ["Fleet #1-4 retrofit and burn-in", "Charging infra audit · zone 1"],
    futurePlans: ["Next week: cohort 3 training", "Week of 6/9: client UAT"],
  },
  {
    id: "DR-2404-211",
    projectId: "PRJ-2404",
    date: TODAY,
    authorId: "EMP-030",
    inProgress: [
      "Cold-aisle AGV #3 commissioning",
      "Battery swap station #2 install",
    ],
    completed: ["Cold-aisle insulation · zone B"],
    futurePlans: ["Coordinate with DeepCold ops for 48h endurance run."],
    risks: "Battery vendor lead time 11 days for backup pack #4.",
  },
];

/** Compute labor cost for a given project from attendance × employee rate. */
import { employeeById } from "./employees";
export function projectLaborToDate(projectId: string) {
  const rows = attendance.filter((a) => a.projectId === projectId);
  return rows.reduce((acc, r) => {
    const emp = employeeById(r.employeeId);
    if (!emp) return acc;
    return acc + (r.regularHours + r.otHours * 1.5) * emp.hourlyRate;
  }, 0);
}
