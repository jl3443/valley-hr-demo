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

export const stages: { id: Stage; title: string; sub: string }[] = [
  { id: "offer-accepted", title: "Offer accepted",  sub: "Pre-Day-1"     },
  { id: "onboarding",     title: "Onboarding",      sub: "Day 1 → Day 90" },
  { id: "active",         title: "Active",          sub: "Post-probation" },
  { id: "transitioning",  title: "Transitioning",   sub: "Internal moves" },
  { id: "offboarding",    title: "Offboarding",     sub: "Notice → last day" },
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
  {
    urgency: "high",
    cardId: "LC-201",
    title: "Maya Chen onboarding · run remaining 7 steps",
    sub: "5/12 auto-completed. Queue NJ anti-discrimination training + Q2 console provisioning + Salesforce role assignment.",
    primary: { label: "Run remaining steps" },
    secondary: { label: "Preview checklist" },
    dueLabel: "Target",
    dueWhen: "Today",
  },
  {
    urgency: "critical",
    cardId: "LC-501",
    title: "Carlos Ramirez offboarding · approve exit package",
    sub: "23 system accesses ready to revoke · final pay $14,820 includes prorated bonus + 16-day NJ-required PTO payout.",
    primary: { label: "Preview letter", target: { kind: "doc", id: "termination-letter" } },
    secondary: { label: "Approve package", target: { kind: "workspace", flow: "uc1" } },
    dueLabel: "Decide by",
    dueWhen: "Tomorrow EOD",
  },
  {
    urgency: "high",
    cardId: "LC-401",
    title: "Sarah Park transfer · re-disclose pay range (NJ WTA)",
    sub: "PAT → WYN promotion · new band $125K–$152K · NJ Wage Transparency Act requires disclosure on the internal posting.",
    primary: { label: "Re-disclose now" },
    secondary: { label: "Preview posting" },
    dueLabel: "Decide by",
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
