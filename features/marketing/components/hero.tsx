import Link from "next/link";

import { COMPLIANCE } from "@/features/marketing/content";
import { InvoicePreview } from "@/features/marketing/components/invoice-preview";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* ruled ground — the faint grid of a ledger sheet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(255,255,255,.045) 0 1px, transparent 1px 88px), repeating-linear-gradient(to bottom, rgba(255,255,255,.045) 0 1px, transparent 1px 88px)",
          maskImage: "radial-gradient(120% 80% at 30% 0%, #000 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 30% 0%, #000 20%, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-18rem] h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #1668E3 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-center gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-16 lg:py-24">
          <div>
            <p className="field-label !text-blue-bright">Cloud accounting for Indian business</p>

            <h1 className="display mt-5 text-[clamp(2.4rem,6.2vw,3.9rem)] text-white">
              Bill it once. The stock and the GST follow.
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/65">
              ERP for All keeps billing, inventory and your GST returns in a single ledger. Every
              invoice you save moves stock, posts to the books, and lands in GSTR-1 — so filing day
              is a review, not a rebuild.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={SITE.signupUrl} className="btn btn-primary">
                Start free trial
              </Link>
              <Link href="/#demo" className="btn btn-on-navy">
                Book a 20-minute demo
              </Link>
            </div>

            <p className="num mt-6 text-[0.8125rem] text-white/40">
              14-day trial · No card needed · Import your item &amp; party master from Excel
            </p>
          </div>

          <InvoicePreview />
        </div>

        {/* what it is compliant with, stated plainly */}
        <ul className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {COMPLIANCE.map((item, i) => (
            <li
              key={item.label}
              className={`border-white/10 pb-8 pr-5 pt-5 ${i > 0 ? "sm:border-l sm:pl-5" : ""} ${
                i % 2 === 1 ? "border-l pl-5 sm:pl-5" : ""
              }`}
            >
              <p className="text-[0.9375rem] font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-[0.8125rem] leading-snug text-white/45">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
