import { Reveal } from "@/components/ui/reveal";
import { ARTIFACTS } from "@/features/marketing/components/pillar-artifacts";
import { PILLARS } from "@/features/marketing/content";

const ACCENT_TEXT = {
  sales: "text-sales",
  stock: "text-stock",
  report: "text-report",
} as const;

const ACCENT_BG = {
  sales: "bg-sales",
  stock: "bg-stock",
  report: "bg-report",
} as const;

export function Pillars() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
      {PILLARS.map((pillar) => {
        const Artifact = ARTIFACTS[pillar.id];

        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className="scroll-mt-20 border-b border-rule py-16 last:border-0 lg:py-24"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className={`num text-[0.8125rem] font-semibold ${ACCENT_TEXT[pillar.accent]}`}>
                    {pillar.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 rounded-full ${ACCENT_BG[pillar.accent]}`}
                  />
                  <span className="field-label">{pillar.eyebrow}</span>
                </div>

                <h2 className="display-sm mt-6 max-w-lg text-[clamp(1.75rem,3.6vw,2.4rem)]">
                  {pillar.title}
                </h2>

                <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
                  {pillar.lede}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <Artifact />
              </Reveal>
            </div>

            <dl className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 md:mt-14">
              {pillar.points.map((point) => (
                <div key={point.term} className="bg-paper p-6 md:p-7">
                  <dt className="flex items-baseline gap-2.5 font-semibold text-ink">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 shrink-0 translate-y-[-0.15em] rounded-full ${ACCENT_BG[pillar.accent]}`}
                    />
                    {point.term}
                  </dt>
                  <dd className="mt-2 pl-4 text-[0.9375rem] leading-relaxed text-ink-2">
                    {point.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
