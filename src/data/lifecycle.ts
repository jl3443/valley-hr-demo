/**
 * People Lifecycle data — drives the 5-column control-tower Kanban,
 * AI pending decisions panel, and 24h activity stream.
 *
 * Every employee, system, and license reference is Valley-bank-specific:
 *   FINRA fingerprinting / Series 6 / Series 7 / Series 79
 *   Core banking + nCino + Salesforce + Bloomberg Terminal + Q2 + OFAC list
 *   Branch codes:  WYN = Wayne NJ HQ · PAT = Paterson NJ · NWK = Newark NJ
 *                  TPA = Tampa FL · NYC = NYC metro · BHM = Birmingham AL
 *   NJ Wage Transparency Act re-disclosure required on any internal transfer
 *   that changes the role's posted pay range.
 */

import type { View } from "@/state";

export type Stage =
  | "offer-accepted"
  | "onboarding"
  | "active"
  | "transitioning"
  | "offboarding";

export type StatusKind = "on-track" | "action" | "blocked";

export type Branch = "WYN" | "PAT" | "NWK" | "TPA" | "NYC" | "BHM";

export type LifecycleCard = {
  id: string;
  stage: Stage;
  name: string;
  initials: string;
  role: string;
  branch: Branch;
  /** Right-aligned key date label — different copy per stage. */
  dateLabel: string;
  date: string;
  /** Progress over the stage's checklist. Pass 0 for `active` (no checklist). */
  stepsDone: number;
  stepsTotal: number;
  status: StatusKind;
  statusLabel: string;
  /** One-line AI commentary — agentic-demo signature. */
  ai: string;
  /** For transfers: source branch (renders as PAT → WYN chip). */
  transferFrom?: Branch;
  /** Optional cross-page link — when set, card becomes clickable and routes to that view. */
  target?: View;
};

export const stages: { id: Stage; title: string }[] = [
  { id: "offer-accepted", title: "Offer accepted"  },
  { id: "onboarding",     title: "Onboarding"      },
  { id: "active",         title: "Active"          },
  { id: "transitioning",  title: "Transitioning"   },
  { id: "offboarding",    title: "Offboarding"     },
];

export const lifecycleCards: LifecycleCard[] = [
  // ── Offer accepted (3) ────────────────────────────────────────────────
  {
    id: "LC-101",
    stage: "offer-accepted",
    name: "Diane Patel",
    initials: "DP",
    role: "Branch Manager",
    branch: "TPA",
    dateLabel: "Day 1",
    date: "May 27",
    stepsDone: 2,
    stepsTotal: 12,
    status: "on-track",
    statusLabel: "On track",
    ai: "FINRA fingerprinting · Wed AM, Tampa branch",
    /* UC4 = Tampa Branch Manager onboarding workspace — exact match */
    target: { kind: "workspace", flow: "uc4" },
  },
  {
    id: "LC-102",
    stage: "offer-accepted",
    name: "Marcus Williams",
    initials: "MW",
    role: "Senior FP&A Analyst",
    branch: "NYC",
    dateLabel: "Day 1",
    date: "Jun 3",
    stepsDone: 1,
    stepsTotal: 10,
    status: "on-track",
    statusLabel: "On track",
    ai: "Preboarding bundle ready · NYC reporting line confirmed",
    /* UC3 = NYC Senior FP&A retention/comp workspace — adjacent context */
    target: { kind: "workspace", flow: "uc3" },
  },
  {
    id: "LC-103",
    stage: "offer-accepted",
    name: "Jasmine Kowalski",
    initials: "JK",
    role: "Compliance Officer",
    branch: "WYN",
    dateLabel: "Day 1",
    date: "Jun 10",
    stepsDone: 1,
    stepsTotal: 14,
    status: "action",
    statusLabel: "Action needed",
    ai: "Series 7 FINRA transfer pending · needed by Jun 9",
  },

  // ── Onboarding (4) ────────────────────────────────────────────────────
  {
    id: "LC-201",
    stage: "onboarding",
    name: "Maya Chen",
    initials: "MC",
    role: "Customer Success Manager",
    branch: "PAT",
    dateLabel: "Day 6 of 90",
    date: "May 13 → Aug 11",
    stepsDone: 5,
    stepsTotal: 12,
    status: "on-track",
    statusLabel: "On track",
    ai: "Remaining: NJ anti-discrim training + Q2 + Salesforce",
  },
  {
    id: "LC-202",
    stage: "onboarding",
    name: "Brian Sullivan",
    initials: "BS",
    role: "Junior Loan Officer",
    branch: "WYN",
    dateLabel: "Day 12 of 90",
    date: "May 7 → Aug 5",
    stepsDone: 9,
    stepsTotal: 12,
    status: "on-track",
    statusLabel: "On track",
    ai: "Bloomberg cleared · 30-day check-in Jun 6",
  },
  {
    id: "LC-203",
    stage: "onboarding",
    name: "Priya Suresh",
    initials: "PS",
    role: "Treasury Analyst",
    branch: "NYC",
    dateLabel: "Day 4 of 90",
    date: "May 15 → Aug 13",
    stepsDone: 4,
    stepsTotal: 12,
    status: "action",
    statusLabel: "Action needed",
    ai: "OFAC clearance stuck · vendor SLA 18h",
  },
  {
    id: "LC-204",
    stage: "onboarding",
    name: "Tomás Aguilar",
    initials: "TA",
    role: "Branch Teller",
    branch: "NWK",
    dateLabel: "Day 21 of 90",
    date: "Apr 28 → Jul 27",
    stepsDone: 11,
    stepsTotal: 12,
    status: "on-track",
    statusLabel: "On track",
    ai: "Probation review Jun 25 · BSA/AML certified",
  },

  // ── Active (aggregate only — see ActiveTile component) ────────────────

  // ── Transitioning (3) ─────────────────────────────────────────────────
  {
    id: "LC-401",
    stage: "transitioning",
    name: "Sarah Park",
    initials: "SP",
    role: "Senior Lending Officer",
    branch: "WYN",
    transferFrom: "PAT",
    dateLabel: "Move date",
    date: "Jun 14",
    stepsDone: 3,
    stepsTotal: 8,
    status: "action",
    statusLabel: "Action needed",
    ai: "NJ WTA re-disclosure · awaiting HRBP sign-off",
    /* UC2 = NJ Wage Transparency compliance workspace — adjacent context */
    target: { kind: "workspace", flow: "uc2" },
  },
  {
    id: "LC-402",
    stage: "transitioning",
    name: "David Nakamura",
    initials: "DN",
    role: "Compliance Lead",
    branch: "WYN",
    transferFrom: "NYC",
    dateLabel: "Move date",
    date: "Jun 1",
    stepsDone: 6,
    stepsTotal: 8,
    status: "on-track",
    statusLabel: "On track",
    ai: "FINRA update filed · NJ relocation stipend approved",
  },
  {
    id: "LC-403",
    stage: "transitioning",
    name: "Anouk Visser",
    initials: "AV",
    role: "Personal Banker (promoted)",
    branch: "NWK",
    transferFrom: "NWK",
    dateLabel: "Effective",
    date: "Jun 7",
    stepsDone: 7,
    stepsTotal: 8,
    status: "on-track",
    statusLabel: "On track",
    ai: "Series 7 upgrade complete · awaiting promotion sign-off",
  },

  // ── Offboarding (2) ───────────────────────────────────────────────────
  {
    id: "LC-501",
    stage: "offboarding",
    name: "Carlos Ramirez",
    initials: "CR",
    role: "Senior Commercial Lender",
    branch: "WYN",
    dateLabel: "Last day",
    date: "Jun 14",
    stepsDone: 12,
    stepsTotal: 14,
    status: "action",
    statusLabel: "Action needed",
    ai: "23 revocations queued · $14,820 final pay ready",
    /* UC1 = Senior Commercial Lender Wayne NJ offboarding — exact match */
    target: { kind: "workspace", flow: "uc1" },
  },
  {
    id: "LC-502",
    stage: "offboarding",
    name: "Anna Chen",
    initials: "AC",
    role: "Mortgage Loan Officer",
    branch: "TPA",
    dateLabel: "Last day",
    date: "Jun 21",
    stepsDone: 4,
    stepsTotal: 14,
    status: "blocked",
    statusLabel: "Blocked",
    ai: "Portfolio blocked · 18 loans need reassignment",
  },
];

// ── Active stage aggregate stat (rendered as a special tile, not a card) ─
export const activeStats = {
  total: 184,
  inProbation: 7,
  postProbation: 177,
  thisQuarterReviews: 41,
};

// ── Lifecycle flow stage volumes — drives the horizontal flow chart ──────
// Each stage shows current count + WoW delta + 8-point trend sparkline.
export type StageVolume = {
  id: Stage;
  title: string;
  count: number;
  delta: number;       // signed: +ve = up vs last week, -ve = down
  spark: number[];     // 8 weekly points
};

export const stageVolumes: StageVolume[] = [
  { id: "offer-accepted", title: "Offer accepted",  count: 3,   delta: +1, spark: [2, 2, 3, 2, 4, 3, 2, 3]   },
  { id: "onboarding",     title: "Onboarding",      count: 4,   delta:  0, spark: [3, 4, 4, 5, 4, 4, 3, 4]   },
  { id: "active",         title: "Active",          count: 184, delta: +6, spark: [172, 174, 176, 178, 178, 180, 182, 184] },
  { id: "transitioning",  title: "Transitioning",   count: 3,   delta: +1, spark: [1, 2, 2, 3, 2, 3, 2, 3]   },
  { id: "offboarding",    title: "Offboarding",     count: 2,   delta: -1, spark: [3, 4, 3, 3, 4, 3, 3, 2]   },
];

// ── 12-month headcount + attrition trend — bank ops standard CXO chart ──
export type TrendPoint = {
  month: string;
  headcount: number;
  hires: number;
  exits: number;
};

export const headcountTrend: TrendPoint[] = [
  { month: "Jun", headcount: 3088, hires: 24, exits: 19 },
  { month: "Jul", headcount: 3104, hires: 28, exits: 12 },
  { month: "Aug", headcount: 3128, hires: 31, exits: 7  },
  { month: "Sep", headcount: 3146, hires: 26, exits: 8  },
  { month: "Oct", headcount: 3162, hires: 22, exits: 6  },
  { month: "Nov", headcount: 3178, hires: 24, exits: 8  },
  { month: "Dec", headcount: 3195, hires: 25, exits: 8  },
  { month: "Jan", headcount: 3208, hires: 21, exits: 8  },
  { month: "Feb", headcount: 3221, hires: 23, exits: 10 },
  { month: "Mar", headcount: 3232, hires: 19, exits: 8  },
  { month: "Apr", headcount: 3241, hires: 18, exits: 9  },
  { month: "May", headcount: 3247, hires: 14, exits: 8  },
];

// ── Compliance health · banking-specific certifications + filings ────────
// Single yellow-highlight bar communicates "this is the one being remediated".
export type ComplianceMetric = {
  label: string;
  current: number;       // numerator (employees / postings compliant)
  total: number;         // denominator
  status: "good" | "warning" | "critical";
  note: string;
};

export const complianceHealth: ComplianceMetric[] = [
  { label: "FINRA license coverage",     current: 142, total: 147, status: "warning",  note: "5 renewals due ≤30 days" },
  { label: "NJ Wage Transparency Act",   current: 132, total: 147, status: "warning",  note: "15 postings being updated" },
  { label: "BSA / AML certifications",   current: 3245,total: 3247,status: "good",     note: "2 grace-period extensions" },
  { label: "OFAC list screening",        current: 3247,total: 3247,status: "good",     note: "All clear" },
];

// ── AI Pending lifecycle decisions ────────────────────────────────────────
export type LifecycleDecision = {
  urgency: "critical" | "high" | "medium";
  cardId: string;
  title: string;
  sub: string;
  primary: { label: string; target?: View };
  secondary?: { label: string; target?: View };
  dueLabel: string;
  dueWhen: string;
};

export const lifecycleDecisions: LifecycleDecision[] = [
  /* CXO decision cards · one plain-English sentence per card.
     No sub-text, no jargon, no system names. The supporting context lives
     inside the workspace the card routes to. */
  {
    urgency: "high",
    cardId: "LC-201",
    title: "Finish Maya Chen's onboarding",
    sub: "",
    primary: { label: "Open", target: { kind: "workspace", flow: "uc4" } },
    dueLabel: "",
    dueWhen: "Today",
  },
  {
    urgency: "critical",
    cardId: "LC-501",
    title: "Approve Carlos Ramirez's exit package",
    sub: "",
    primary: { label: "Open", target: { kind: "workspace", flow: "uc1" } },
    dueLabel: "",
    dueWhen: "Tomorrow",
  },
  {
    urgency: "high",
    cardId: "LC-401",
    title: "Publish Sarah Park's promotion",
    sub: "",
    primary: { label: "Open", target: { kind: "workspace", flow: "uc2" } },
    dueLabel: "",
    dueWhen: "End of week",
  },
];

// ── 24-hour activity stream — what the agent did for you ──────────────────
export type LifecycleActivity = {
  at: string;
  actor: "Agent" | "HRBP" | "System";
  what: string;
  who?: string;
  branch?: Branch;
  highlight?: boolean; // yellow accent for important lines
  /** Cross-page link — when set, entry becomes clickable. */
  target?: View;
};

export const lifecycleActivity: LifecycleActivity[] = [
  { at: "7:14 AM",       actor: "Agent",  what: "Detected NJ Wage Transparency Act amendment — 147 open postings flagged for re-disclosure.", highlight: true,
    target: { kind: "workspace", flow: "uc2" } },
  { at: "6:42 AM",       actor: "Agent",  what: "Bloomberg Terminal access provisioned",                          who: "Brian Sullivan",   branch: "WYN" },
  { at: "5:28 AM",       actor: "Agent",  what: "Series 6 → Series 7 license upgrade marked complete with FINRA registry", who: "Anouk Visser", branch: "NWK" },
  { at: "Yest. 11:42 PM",actor: "Agent",  what: "Offboarding letter drafted in EN + ES",                          who: "Carlos Ramirez",   branch: "WYN",
    target: { kind: "doc", id: "termination-letter" } },
  { at: "Yest.  9:15 PM",actor: "System", what: "OFAC clearance request submitted to vendor (SLA: 24h)",         who: "Priya Suresh",     branch: "NYC" },
  { at: "Yest.  6:00 PM",actor: "Agent",  what: "Internal transfer initiated · NJ Wage Transparency re-disclosure queued", who: "Sarah Park", branch: "WYN", highlight: true,
    target: { kind: "workspace", flow: "uc2" } },
  { at: "Yest.  3:22 PM",actor: "Agent",  what: "FINRA fingerprinting appointment booked",                       who: "Diane Patel",      branch: "TPA",
    target: { kind: "workspace", flow: "uc4" } },
  { at: "Yest.  1:08 PM",actor: "Agent",  what: "Probation review scheduled for Jun 25",                         who: "Tomás Aguilar",    branch: "NWK" },
  { at: "Yest. 11:00 AM",actor: "Agent",  what: "Offboarding initiated · portfolio handoff blocked (18 active loans)", who: "Anna Chen",   branch: "TPA" },
  { at: "Yest.  9:48 AM",actor: "Agent",  what: "Internal transfer audit run · 0 violations across 23 active transitions",                       branch: "WYN",
    target: { kind: "compliance-radar" } },
];
