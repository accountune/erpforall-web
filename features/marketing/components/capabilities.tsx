import { Reveal } from "@/components/ui/reveal";
import { CAPABILITIES } from "@/features/marketing/content";

export function Capabilities() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
      <Reveal>
        <p className="field-label">Also included</p>
        <h2 className="display-sm mt-6 max-w-2xl text-[clamp(1.75rem,3.6vw,2.4rem)]">
          The rest of the things a working day asks for
        </h2>
      </Reveal>

      {/* gap-px over a rule-coloured ground draws the grid as hairlines */}
      <dl className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((item) => (
          <div key={item.title} className="bg-paper p-6 lg:p-7">
            <dt className="text-[0.9375rem] font-semibold text-ink">{item.title}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
