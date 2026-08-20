import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Billing & invoicing", href: "/#billing" },
      { label: "Stock management", href: "/#stock" },
      { label: "GST reports", href: "/#gst" },
      { label: "How it works", href: "/#flow" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Log in", href: SITE.loginUrl },
      { label: "Start free trial", href: SITE.signupUrl },
      { label: "Book a demo", href: "/#demo" },
      { label: "Contact support", href: `mailto:${SITE.email}` },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Data & security", href: "/privacy-policy#security" },
      { label: "Your rights", href: "/privacy-policy#rights" },
      { label: "Grievance officer", href: "/privacy-policy#grievance" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-navy text-white/70">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-12 border-b border-white/10 py-14 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-10">
          <div>
            <Logo variant="stacked" onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Cloud accounting for Indian businesses — billing, stock and GST returns kept in one
              ledger.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="field-label !text-white/40">{col.heading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-rule text-[0.9375rem] text-white/70 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 py-7 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalEntity}. All rights reserved.
          </p>
          <p className="num">
            GST-ready · e-Invoice · e-Way bill · Data hosted in India
          </p>
        </div>
      </div>
    </footer>
  );
}
