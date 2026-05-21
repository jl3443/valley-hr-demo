import { DocChrome, Paper, SideRail } from "./DocChrome";

/**
 * In the original DSM-F build this was the Betriebsrat (German works council)
 * notice. NJ banking doesn't have a works-council equivalent — the closest
 * analogue is an HR Bulletin filed with NJ DOL + posted internally + (where
 * applicable) sent to OPEIU Local 153 which represents some NJ bank office
 * workers. Filing remains the "final step" before changes go live.
 * Component name kept as `WorksCouncilNotice` for back-compat.
 */
export function WorksCouncilNotice() {
  return (
    <DocChrome
      title="Document · HR bulletin + NJ DOL filing · English"
      secondary={{ label: "Edit" }}
      primary={{ label: "File bulletin" }}
    >
      <Paper>
        <header className="flex items-center gap-3.5 pb-5 border-b border-divider">
          <div className="w-10 h-10 rounded-lg bg-surface-deep flex items-center justify-center text-ink-inverse text-[14px] font-bold">
            VB
          </div>
          <div className="text-[13px] leading-tight">
            <div className="text-ink">Valley People team · Wayne NJ HQ</div>
            <div className="text-mute text-[12px]">1455 Valley Road, Wayne NJ 07470</div>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-6 text-[13px]">
          {[
            ["Document", "HR Bulletin · NJ Wage Transparency"],
            ["Reference", "HRB-2026-0184"],
            ["Date", "May 19, 2026"],
            ["Per", "P.L. 2024, Ch. 91 (S.2310/A.4151)"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11px] tracking-[0.08em] uppercase text-mute font-medium">{k}</div>
              <div className="text-[13px] text-ink mt-0.5">{v}</div>
            </div>
          ))}
        </div>

        <div className="space-y-0.5">
          <div className="text-[13px] text-ink">To:</div>
          <div className="text-[15px] font-bold text-ink">All Valley managers, recruiters, hiring partners</div>
          <div className="text-[13px] text-mute">cc: NJ Dept. of Labor and Workforce Development · OPEIU Local 153 (informational)</div>
        </div>

        <div className="bg-surface-mint rounded p-4 space-y-1.5">
          <div className="text-[11px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Subject
          </div>
          <div className="text-[15px] font-bold text-ink leading-tight">
            Adoption of NJ Wage Transparency Act compliance protocol — effective June 1, 2025
          </div>
        </div>

        <div className="space-y-3 text-[14px] leading-[22px] text-ink">
          <p>Colleagues,</p>
          <p>
            This bulletin notifies all Valley hiring teams of the firm's adoption of the New Jersey
            Wage Transparency Act (S.2310/A.4151, P.L. 2024 Ch. 91) compliance protocol. Effective
            June 1, 2025, every job posting and promotion announcement we publish in New Jersey — or
            for NJ-eligible remote roles — must include a real lower-bound and upper-bound salary
            range and a general description of benefits and other compensation programs.
          </p>
          <p>
            Implementation is phased over the next 90 days. The careers page, ATS posting templates
            (Workday + LinkedIn + Indeed + Greenhouse), and the employee handbook (Section 6) have
            been updated. Existing open requisitions will be re-posted with the disclosure no later
            than May 31. No changes to base compensation are introduced by this bulletin.
          </p>
          <p>
            A copy of this bulletin is filed with the NJ Department of Labor and Workforce Development.
            We propose a 30-minute live walk-through for hiring managers on May 26 at 2:00 PM ET via
            Teams. Questions can be routed through HR Concierge.
          </p>
        </div>

        <div className="bg-surface-fog rounded p-4">
          <div className="text-[11px] tracking-[0.08em] uppercase text-mute font-medium mb-2">
            Spanish summary
          </div>
          <p className="text-[14px] leading-[22px] text-ink">
            Este boletín notifica al equipo de Valley sobre la adopción del protocolo de cumplimiento
            de la Ley de Transparencia Salarial de Nueva Jersey, vigente desde el 1 de junio de 2025.
            Todos los anuncios de empleo en Nueva Jersey o para puestos remotos elegibles en NJ deben
            incluir un rango salarial con límites inferior y superior reales más una descripción de
            beneficios.
          </p>
        </div>

        <div className="pt-3 space-y-1">
          <div className="text-[13px] text-ink">Best regards,</div>
          <div className="text-[15px] font-bold text-ink">Annika Vasquez</div>
          <div className="text-[12px] text-mute">HR Director · Valley National Bank · e-signed May 19, 2026, 11:42 ET</div>
        </div>
      </Paper>

      <SideRail>
        <div className="bg-white border border-divider rounded-md p-5 space-y-2.5">
          <div className="text-[14px] font-bold text-ink">Legal basis</div>
          {[
            ["P.L. 2024 Ch. 91",      "NJ Wage Transparency Act — required pay disclosure"],
            ["N.J.A.C. 12:235",        "NJ DOL administrative filing rules"],
            ["NJ DOL bulletin filing", "Internal HR bulletin + filing recommended pre-adoption"],
          ].map(([code, sub]) => (
            <div key={code}>
              <div className="text-[13px] font-medium text-surface-deep">{code}</div>
              <div className="text-[12px] text-mute">{sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-surface-mint rounded-md p-5 space-y-2.5">
          <div className="text-[11px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Implementation timing
          </div>
          <div className="text-[14px] font-bold text-ink">Phased 90-day rollout</div>
          {[
            ["May 19", "Bulletin filed",       "Today"],
            ["May 26", "Hiring-manager walk-through", "Proposed"],
            ["May 31", "All postings re-issued with disclosure", "Internal target"],
            ["Jun  1", "Statutory effective date",  "NJ Wage Transparency Act"],
          ].map(([d, l, s]) => (
            <div key={l} className="flex items-start gap-3">
              <div className="text-[12px] font-medium text-surface-deep w-12 shrink-0">{d}</div>
              <div>
                <div className="text-[13px] text-ink">{l}</div>
                <div className="text-[11px] text-mute">{s}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-fog rounded-md p-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mark-red" />
            <span className="text-[11px] tracking-[0.06em] uppercase text-mark-red font-medium">
              If we skip this
            </span>
          </div>
          <p className="text-[13px] text-ink mt-1.5 leading-[20px]">
            NJ DOL may issue civil penalties up to $300 per posting (first violation) and $600 per
            subsequent posting. Repeated violations can also trigger an audit.
          </p>
        </div>
      </SideRail>
    </DocChrome>
  );
}
