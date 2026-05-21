import { DocChrome, SideRail } from "./DocChrome";

function LangColumn({
  lang,
  subject,
  body,
  signoff,
  recipientLine,
}: {
  lang: string;
  subject: string;
  body: string[];
  signoff: string[];
  recipientLine: string;
}) {
  return (
    <article className="bg-white border border-divider rounded-md p-10 space-y-4">
      <span className="inline-flex px-2.5 py-1 rounded-full bg-black text-ink-inverse text-[11px] tracking-[0.06em] uppercase font-medium">
        {lang}
      </span>
      <div className="text-[12px] text-mute">
        From: Valley People team · May 19, 2026
        <br />
        To: {recipientLine}
      </div>
      <h2 className="text-[20px] font-bold leading-[26px] text-ink">{subject}</h2>
      {body.map((p, i) => (
        <p key={i} className="text-[14px] leading-[22px] text-ink">{p}</p>
      ))}
      <div className="pt-2">
        {signoff.map((line, i) => (
          <div key={i} className="text-[14px] text-ink">{line}</div>
        ))}
      </div>
    </article>
  );
}

export function EmployeeAnnouncement() {
  return (
    <DocChrome
      title="Document · Employee bulletin · English + Spanish"
      secondary={{ label: "Edit translation" }}
      primary={{ label: "Send to 147 hiring teams" }}
    >
      <div className="grid grid-cols-2 gap-4 col-span-1">
        <LangColumn
          lang="EN · English"
          subject="New Jersey pay-range disclosure starts June 1"
          recipientLine="All managers, recruiters, and hiring partners (147)"
          body={[
            "Hi team,",
            "New Jersey's Wage Transparency Act takes effect on June 1, 2025. Starting that day, every job posting and promotion announcement we publish in New Jersey — or for NJ-eligible remote roles — must include the salary range (a real lower and upper bound) plus a general description of benefits. Open-ended ranges (\"$60k and up\") are no longer permitted.",
            "Our ATS, careers page, and posting templates have already been updated by HR. Your job is to review the range your team approved and pick the right one when you create a new requisition. The default ranges are pulled from the latest comp band review.",
            "If you have any questions, reply to this email or chat with HR Concierge any time.",
          ]}
          signoff={["Best,", "Valley People team"]}
        />
        <LangColumn
          lang="ES · Español"
          subject="Divulgación de salario en Nueva Jersey · entra en vigor el 1 de junio"
          recipientLine="Todos los gerentes, reclutadores y socios de contratación (147)"
          body={[
            "Hola equipo:",
            "La Ley de Transparencia Salarial de Nueva Jersey entra en vigor el 1 de junio de 2025. A partir de esa fecha, cada anuncio de empleo o promoción que publiquemos en Nueva Jersey — o para puestos remotos elegibles en NJ — debe incluir el rango salarial (un límite inferior y superior reales) más una descripción general de los beneficios. Los rangos abiertos (\"$60,000 en adelante\") ya no se permiten.",
            "Nuestro ATS, la página de carreras y las plantillas de publicación ya fueron actualizadas por Recursos Humanos. Su tarea es revisar el rango aprobado por su equipo y seleccionar el correcto al crear una nueva requisición. Los rangos predeterminados provienen de la revisión más reciente de bandas salariales.",
            "Si tienen preguntas, respondan a este correo o consulten con HR Concierge en cualquier momento.",
          ]}
          signoff={["Saludos,", "Equipo de Personas de Valley"]}
        />
      </div>

      <SideRail>
        <div className="bg-surface-mint rounded-md p-5 space-y-3">
          <div className="text-[14px] font-bold text-ink">Translation quality</div>
          {[
            ["Length match", "98%"],
            ["Tone match", "Professional + clear"],
            ["Reading level", "Grade 8 · clear"],
            ["Legal accuracy", "Reviewed by AI"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-[13px]">
              <span className="text-ink">{k}</span>
              <span className="text-surface-deep">{v}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-divider rounded-md p-5 space-y-2">
          <div className="text-[14px] font-bold text-ink">Audience</div>
          {[
            ["Wayne NJ HQ", "62"],
            ["Branch network (NJ + NY)", "48"],
            ["FL · AL · CA back-office", "21"],
            ["NJ-eligible remote", "16"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-[13px]">
              <span className="text-ink">{k}</span>
              <span className="text-mute">{v}</span>
            </div>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-divider mt-2">
            <span className="text-[13px] text-ink">Total</span>
            <span className="text-[15px] font-bold text-surface-deep">147</span>
          </div>
        </div>
      </SideRail>
    </DocChrome>
  );
}
