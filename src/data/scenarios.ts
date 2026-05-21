/**
 * Per-flow scripted scenarios — the 5 steps each workspace plays through.
 * Step copy is the source of truth for what shows in the timeline and the
 * activity log. Every artifact mentioned here has a matching document
 * preview under /data/documents.ts and the doc preview page.
 *
 * Adapted for Valley Bank: NJ employment law focus on UC2 (NJ Wage
 * Transparency Act), NJ banker offboarding on UC1, etc.
 */

import type { DocId } from "@/state";

export type Actor = "Agent" | "HRBP" | "Employee" | "Day 1" | "Last day";

export type FlowStep = {
  /** Short title shown on the timeline node. */
  title: string;
  actor: Actor;
  /** Body shown under the title on the timeline node. */
  detail: string;
  /** Mock timestamp shown on the right of the timeline node. */
  time: string;
};

export type FlowDef = {
  id: "uc1" | "uc2" | "uc3" | "uc4";
  /** Topbar context line in the workspace. */
  contextTitle: string;
  contextSub: string;
  statusPill: string;
  alert: {
    title: string;
    sub: string;
  };
  steps: FlowStep[];
};

export const uc2Flow: FlowDef = {
  id: "uc2",
  contextTitle: "NJ Wage Transparency Act compliance",
  contextSub: "Detected at 7:14 AM today",
  statusPill: "Awaiting your decision",
  alert: {
    title: "New Jersey · Wage Transparency Act (S.2310/A.4151)",
    sub: "Every NJ job posting must include pay range + benefits summary · effective in 90 days · 147 open postings affected",
  },
  steps: [
    {
      title: "Detect law change",
      actor: "Agent",
      detail: "Picked up the NJ Wage Transparency Act enrollment from the state regulatory feed. High confidence.",
      time: "7:14 AM",
    },
    {
      title: "Calculate impact",
      actor: "Agent",
      detail: "147 open postings affected · 12 careers-page templates to update · 4 ATS integrations to reconfigure.",
      time: "7:15 AM",
    },
    {
      title: "Draft all required documents",
      actor: "Agent",
      detail: "Handbook edits · employee bulletin (English + Spanish) · careers-page disclosure clause · ATS posting template.",
      time: "7:17 AM",
    },
    {
      title: "Human review",
      actor: "HRBP",
      detail: "Decision card sent. See the right pane.",
      time: "now",
    },
    {
      title: "Roll out the changes",
      actor: "Agent",
      detail: "Update ATS posting templates, publish bulletin, file handbook redline, log the decision.",
      time: "—",
    },
  ],
};

export const uc1Flow: FlowDef = {
  id: "uc1",
  contextTitle: "Senior Commercial Lender · Wayne NJ offboarding",
  contextSub: "Resignation received yesterday · click each step to run",
  statusPill: "Click each step to run",
  alert: {
    title: "Carlos Ramirez · Senior Commercial Lending Officer · Wayne, NJ",
    sub: "Two-week notice · last day Friday 27 June · 14 single-owner accounts · 23 SaaS accesses to revoke",
  },
  steps: [
    {
      title: "Read resignation notice",
      actor: "Agent",
      detail: "Parse the email + extract last working day, notice period, base salary + commission baseline.",
      time: "Yesterday",
    },
    {
      title: "Generate KT plan",
      actor: "Agent",
      detail: "Map Carlos's portfolio (47 commercial clients), pipeline (12 open loan files), and single-owner SOPs.",
      time: "Click to run",
    },
    {
      title: "Compile access revocation",
      actor: "Agent",
      detail: "23 SaaS systems (nCino, Salesforce, FIS Profile, Q2, etc.) · each item timed to NJ last-day deadline.",
      time: "Click to run",
    },
    {
      title: "Draft localized exit package",
      actor: "Agent",
      detail: "Final pay · prorated annual bonus · accrued PTO payout (NJ-required) · offboarding letter (English + Spanish).",
      time: "Click to run",
    },
    {
      title: "HRBP single approval",
      actor: "HRBP",
      detail: "One card summarizing KT plan, revocation list, exit package. Approve in one click.",
      time: "Awaiting",
    },
  ],
};

export const uc3Flow: FlowDef = {
  id: "uc3",
  contextTitle: "Retention case · Senior FP&A Analyst",
  contextSub: "Manager request at 11:02 AM",
  statusPill: "Pick a scenario",
  alert: {
    title: "Senior FP&A Analyst · New York · current $124K (9% below market)",
    sub: "Manager: \"My top performer is underpaid — fix it before she resigns.\"",
  },
  steps: [
    {
      title: "Pull market data",
      actor: "Agent",
      detail: "Market data: Senior FP&A Analyst in NYC metro, range $128K–$162K, median $138K.",
      time: "11:03 AM",
    },
    {
      title: "Compute internal equity",
      actor: "Agent",
      detail: "Compared 11 teammates across Valley FP&A. 2 are within 5% of the proposed salary.",
      time: "11:04 AM",
    },
    {
      title: "Draft three options",
      actor: "Agent",
      detail: "Conservative · Mid · Retention, with budget impact and one-line reasoning.",
      time: "11:05 AM",
    },
    {
      title: "Human picks a scenario",
      actor: "HRBP",
      detail: "Decision card sent. See the right pane.",
      time: "now",
    },
    {
      title: "Generate deliverables",
      actor: "Agent",
      detail: "Salary update form, manager talking points, one-page summary for Finance.",
      time: "—",
    },
  ],
};

export const uc4Flow: FlowDef = {
  id: "uc4",
  contextTitle: "Branch Manager · Tampa onboarding",
  contextSub: "Offer signed yesterday · starts Mon 25 May",
  statusPill: "Click each step to run",
  alert: {
    title: "Diane Patel · Branch Manager · Tampa, FL",
    sub: "Signed offer received · Day 1 in 4 working days · FL + federal banking compliance bundle ready to file",
  },
  steps: [
    {
      title: "Read signed offer",
      actor: "Agent",
      detail: "Parsed offer + job profile. Pulled candidate record, role template, start date.",
      time: "Yesterday",
    },
    {
      title: "File preboarding bundle",
      actor: "Agent",
      detail: "Welcome message, equipment ticket, IT provisioning, NMLS registration check — filed together.",
      time: "Click to run",
    },
    {
      title: "Build Day-1 calendar + 30/60/90",
      actor: "Agent",
      detail: "Pull regional VP's calendar, slot intro meetings, generate milestone plan from branch-manager role template.",
      time: "Click to run",
    },
    {
      title: "State + federal compliance scan",
      actor: "Agent",
      detail: "FL state banking checks · Bank Secrecy Act + AML certifications · mandatory FDIC training.",
      time: "Click to run",
    },
    {
      title: "HRBP single approval",
      actor: "HRBP",
      detail: "One card summarizing everything. Approve in one click or make small edits.",
      time: "Awaiting",
    },
  ],
};

export const flowsById: Record<"uc1" | "uc2" | "uc3" | "uc4", FlowDef> = {
  uc1: uc1Flow,
  uc2: uc2Flow,
  uc3: uc3Flow,
  uc4: uc4Flow,
};

/** Documents linked from each workspace's decision card. */
export const docLinksByFlow: Record<"uc1" | "uc2" | "uc3" | "uc4", DocId[]> = {
  uc1: ["termination-letter"],
  uc2: ["working-hours-act", "handbook-redline", "employee-announcement", "works-council-notice"],
  uc3: ["comp-deliverables"],
  uc4: [],
};
