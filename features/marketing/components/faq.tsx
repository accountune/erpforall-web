import { Reveal } from "@/components/ui/reveal";
import { FAQS } from "@/features/marketing/content";

/**
 * Native disclosure elements — keyboard and screen-reader behaviour comes
 * free, and the section costs no JavaScript.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-rule bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <p className="field-label">Questions</p>
            <h2 className="display-sm mt-6 max-w-sm text-[clamp(1.75rem,3.6vw,2.4rem)]">
              The things people ask before they switch
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
              Something not covered here? Ask on the demo call — it is a conversation, not a
              presentation.
            </p>
          </Reveal>

          <Reveal delay={80} className="border-t border-rule">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium text-ink marker:hidden">
                  <span className="flex-1">{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="relative mt-2 h-3 w-3 shrink-0 text-blue transition-transform duration-200 group-open:rotate-45"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-8 text-[0.9375rem] leading-relaxed text-ink-2">
                  {faq.answer}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
