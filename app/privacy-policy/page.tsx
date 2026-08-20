import type { Metadata } from "next";
import Link from "next/link";

import { PolicyBody } from "@/features/privacy/components/policy-body";
import { PolicyIndex } from "@/features/privacy/components/policy-index";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE.name} collects, uses, stores and protects personal data, and the rights you have under the Digital Personal Data Protection Act, 2023.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-navy">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="field-label !text-white/40">
            <Link href="/" className="link-rule hover:text-white/70">
              Home
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span className="text-white/70">Privacy policy</span>
          </nav>

          <h1 className="display mt-6 max-w-3xl text-[clamp(2.1rem,5vw,3.2rem)] text-white">
            Privacy policy
          </h1>

          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/60">
            Your books are your business. This page sets out exactly what we hold, why we hold it,
            and what you can make us do about it.
          </p>

          <dl className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              { term: "Effective from", detail: SITE.policyEffectiveFrom },
              { term: "Last updated", detail: SITE.policyLastUpdated },
              { term: "Applies to", detail: `${SITE.name} app and website` },
            ].map((row) => (
              <div key={row.term} className="bg-navy px-6 py-5">
                <dt className="field-label !text-white/40">{row.term}</dt>
                <dd className="num mt-2 text-[0.9375rem] text-white/85">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-20">
          <PolicyIndex />
          <PolicyBody />
        </div>
      </div>
    </>
  );
}
