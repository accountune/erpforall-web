import { Reveal } from "@/components/ui/reveal";
import { WORKFLOW } from "@/features/marketing/content";

const ACCENT_BG = {
  sales: "bg-sales",
  stock: "bg-stock",
  report: "bg-report",
} as const;

const ACCENT_TEXT = {
  sales: "text-sales",
  stock: "text-stock",
  report: "text-report",
} as const;

/**
 * Numbered because this genuinely is a sequence — it is the order the data
 * moves in. Nothing else on the page is numbered.
 */
export function Workflow() {
  return (
    <section id="flow" className="scroll-mt-20 border-y border-rule bg-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="pb-10 pt-14 lg:pb-12 lg:pt-20">
          <p className="field-label">How it works</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h2 className="display-sm max-w-lg text-[clamp(1.75rem,3.6vw,2.4rem)]">
              One entry does three jobs
            </h2>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
              There is no export step in the middle and no second system to keep in agreement. The
              bill is the entry; stock, ledgers and returns are all downstream of it.
            </p>
          </div>
        </Reveal>

        <ol className="grid border-t border-rule md:grid-cols-3">
          {WORKFLOW.map((item, i) => (
            <Reveal
              as="li"
              key={item.step}
              delay={i * 90}
              className="border-b border-rule py-9 md:border-b-0 md:border-l md:py-11 md:pl-10 md:pr-10 md:first:border-l-0 md:first:pl-0"
            >
              <span aria-hidden="true" className={`block h-0.5 w-14 ${ACCENT_BG[item.accent]}`} />
              <span
                className={`num mt-6 block text-[0.8125rem] font-semibold ${ACCENT_TEXT[item.accent]}`}
              >
                {item.step}
              </span>
              <h3 className="display-sm mt-3 text-[1.1875rem]">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{item.detail}</p>
            </Reveal>
          ))}
        </ol>

        <div className="border-t border-rule py-6">
          <p className="num text-[0.8125rem] text-ink-3">
            Elapsed between step 01 and step 03: none. They are the same save.
          </p>
        </div>
      </div>
    </section>
  );
}
