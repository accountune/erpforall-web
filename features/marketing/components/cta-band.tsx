import Link from "next/link";

import { SITE } from "@/lib/site";

export function CtaBand() {
  return (
    <section id="demo" className="scroll-mt-16 bg-navy">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <p className="field-label !text-blue-bright">Start</p>
            <h2 className="display mt-5 max-w-2xl text-[clamp(2rem,4.4vw,2.9rem)] text-white">
              Bring one month of billing across and see the returns build themselves.
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/60">
              Set-up takes an afternoon. Send your item and party master as an Excel file and we
              will import it before the demo, so you are looking at your own books, not ours.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href={SITE.signupUrl} className="btn btn-primary">
              Start free trial
            </Link>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Demo request — ERP for All")}`}
              className="btn btn-on-navy"
            >
              Email us for a demo
            </a>
          </div>
        </div>

        <dl className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
          {[
            { term: "Talk to us", detail: SITE.email },
            { term: "Hours", detail: "Mon–Sat, 9:30–19:00 IST" },
          ].map((row) => (
            <div key={row.term} className="bg-navy px-6 py-5">
              <dt className="field-label !text-white/40">{row.term}</dt>
              <dd className="num mt-2 text-[0.9375rem] text-white/85">{row.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
