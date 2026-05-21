/**
 * Dashboard case list — every row is real, every row routes to a workspace
 * or document preview. CXO sees the 7 cases that drive the demo.
 *
 * Adapted from the original (German + multi-country HR) to Valley Bank's
 * actual footprint: NJ HQ (Wayne), NY metro, FL Tampa/Miami branches,
 * AL Birmingham (legacy from Valley's CB Financial acquisition), CA Hudson
 * Valley admin. NJ-employment-law focus, per user direction.
 */

import type { View } from "@/state";

export type CaseStatus = "critical" | "ready" | "progress" | "resolved";

export type CaseRow = {
  id: string;
  flag: string;
  country: string;
  title: string;
  sub: string;
  type: "Compliance" | "Offboarding" | "Compensation" | "Onboarding";
  status: string;
  statusKind: CaseStatus;
  due: string;
  dueUrgent: boolean;
  target: View;
};

export const cases: CaseRow[] = [
  {
    id: "HR-0184",
    flag: "🗽",
    country: "New Jersey",
    title: "NJ Wage Transparency Act compliance",
    sub: "Compliance · 147 open postings · proposal ready",
    type: "Compliance",
    status: "Needs decision",
    statusKind: "critical",
    due: "Today",
    dueUrgent: true,
    target: { kind: "workspace", flow: "uc2" },
  },
  {
    id: "HR-0178",
    flag: "🗽",
    country: "New Jersey",
    title: "Senior Commercial Lender · Wayne offboarding",
    sub: "Lifecycle · last day Fri 27 Jun · click-to-run flow",
    type: "Offboarding",
    status: "Ready to run",
    statusKind: "ready",
    due: "Fri",
    dueUrgent: false,
    target: { kind: "workspace", flow: "uc1" },
  },
  {
    id: "HR-0182",
    flag: "🗽",
    country: "New York",
    title: "Senior FP&A Analyst retention case",
    sub: "Compensation · three options drafted · pick one",
    type: "Compensation",
    status: "Pick one",
    statusKind: "critical",
    due: "Today",
    dueUrgent: true,
    target: { kind: "workspace", flow: "uc3" },
  },
  {
    id: "HR-0175",
    flag: "🌴",
    country: "Florida",
    title: "Branch Manager · Tampa onboarding",
    sub: "Lifecycle · starts Mon 25 May · click-to-run flow",
    type: "Onboarding",
    status: "Ready to run",
    statusKind: "progress",
    due: "Mon",
    dueUrgent: false,
    target: { kind: "workspace", flow: "uc4" },
  },
  {
    id: "HR-0170",
    flag: "🇺🇸",
    country: "Multi-state",
    title: "Q2 federal pay-equity audit",
    sub: "Compliance · filed for you on 15 May",
    type: "Compliance",
    status: "Resolved",
    statusKind: "resolved",
    due: "Closed",
    dueUrgent: false,
    target: { kind: "compliance-radar" },
  },
];

export type AlertRow = {
  severity: "critical" | "warning" | "info";
  title: string;
  time: string;
};

export const alerts: AlertRow[] = [
  { severity: "critical", title: "NJ Wage Transparency Act update detected", time: "7:14 AM today" },
  { severity: "critical", title: "Senior FP&A Analyst retention case from manager", time: "11:02 AM today" },
  { severity: "warning", title: "Wayne NJ offboarding package ready to approve", time: "Yesterday" },
  { severity: "info", title: "Federal Q2 pay-equity audit filed (handled)", time: "15 May" },
];

export type CountryRow = {
  country: string;
  flag: string;
  employees: string;
  cases: string;
  activity: string;
  status: string;
  statusKind: "ok" | "active" | "alert";
};

// Valley Bank footprint — Wayne NJ HQ + NY/NJ/FL/AL/CA branches and back-office
export const countries: CountryRow[] = [
  { country: "New Jersey · Wayne HQ + branches",  flag: "🗽", employees: "2,184", cases: "3", activity: "Wage Transparency Act · offboarding", status: "Needs decision", statusKind: "alert" },
  { country: "New York · NYC metro",                flag: "🗽", employees: "642",   cases: "2", activity: "Retention review · NYC pay law prep", status: "Active", statusKind: "active" },
  { country: "Florida · Tampa + Miami",             flag: "🌴", employees: "812",   cases: "2", activity: "Branch onboarding · annual reviews", status: "On track", statusKind: "ok" },
  { country: "Alabama · Birmingham (legacy CB)",    flag: "🌾", employees: "518",   cases: "1", activity: "Title-VII training cycle",            status: "On track", statusKind: "ok" },
  { country: "California · Hudson Valley admin",    flag: "🌉", employees: "324",   cases: "1", activity: "CCPA data-rights review",             status: "On track", statusKind: "ok" },
  { country: "Remote · multi-state",                flag: "💻", employees: "486",   cases: "1", activity: "State-tax nexus check",               status: "On track", statusKind: "ok" },
  { country: "Puerto Rico · San Juan",              flag: "🏝️", employees: "218",   cases: "—", activity: "All clear",                            status: "Quiet",    statusKind: "ok" },
];

export type PendingDecision = {
  urgency: "critical" | "high" | "medium";
  id: string;
  type: string;
  country: string;
  title: string;
  sub: string;
  dueLabel: string;
  dueWhen: string;
  target: View;
};

export const pendingDecisions: PendingDecision[] = [
  {
    urgency: "critical",
    id: "HR-0184",
    type: "Compliance",
    country: "New Jersey",
    title: "NJ Wage Transparency Act · adopt pay-range disclosure",
    sub: "147 open postings affected · 12 careers-page templates · HR bulletin ready",
    dueLabel: "Decide by",
    dueWhen: "Today, end of day",
    target: { kind: "workspace", flow: "uc2" },
  },
  {
    urgency: "critical",
    id: "HR-0182",
    type: "Compensation",
    country: "New York",
    title: "Senior FP&A Analyst retention case · three options",
    sub: "Pick a scenario. Conservative · Mid · Retention. Internal equity preview ready.",
    dueLabel: "Decide by",
    dueWhen: "Today, end of day",
    target: { kind: "workspace", flow: "uc3" },
  },
  {
    urgency: "high",
    id: "HR-0178",
    type: "Offboarding",
    country: "New Jersey",
    title: "Senior Commercial Lender · Wayne · approve offboarding package",
    sub: "Last day Friday · offboarding letter drafted in English + Spanish · 23 systems queued",
    dueLabel: "Decide by",
    dueWhen: "Tomorrow",
    target: { kind: "workspace", flow: "uc1" },
  },
];
