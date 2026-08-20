"use client";

import { useEffect, useState } from "react";

import { INVOICE } from "@/features/marketing/content";
import { inr } from "@/lib/format";

/** Total number of reveal steps: 4 line items, tax block, total, words, stamp. */
const STEPS = INVOICE.items.length + 4;

/**
 * The hero's argument, made as an object rather than a claim: a tax invoice
 * assembling itself. Line items land, the CGST/SGST split resolves, the
 * total rounds, and the return stamp drops — which is the whole product in
 * six seconds.
 */
export function InvoicePreview() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(STEPS);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, value: number) => timers.push(setTimeout(() => setStep(value), ms));

    at(420, 1);
    at(700, 2);
    at(980, 3);
    at(1260, 4);
    at(1700, 5); // taxable + tax split
    at(2100, 6); // grand total
    at(2400, 7); // amount in words
    at(2850, 8); // return stamp

    return () => timers.forEach(clearTimeout);
  }, []);

  const shown = (n: number) => step >= n;

  return (
    <figure className="relative">
      <div className="sheet relative overflow-hidden shadow-[0_28px_70px_-24px_rgba(3,10,24,.75)]">
        {/* document head */}
        <div className="border-b border-rule px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="field-label">Tax invoice</p>
              <p className="num mt-1.5 text-[0.9375rem] font-medium text-ink">
                {INVOICE.number}
              </p>
            </div>
            <div className="text-right">
              <p className="field-label">Dated</p>
              <p className="num mt-1.5 text-[0.9375rem] text-ink">{INVOICE.date}</p>
            </div>
          </div>
        </div>

        {/* parties */}
        <div className="grid grid-cols-2 border-b border-rule text-[0.8125rem]">
          <div className="border-r border-rule px-5 py-3.5 sm:px-6">
            <p className="field-label">Billed by</p>
            <p className="mt-1.5 font-semibold text-ink">{INVOICE.seller.name}</p>
            <p className="num mt-0.5 text-[0.75rem] text-ink-3">{INVOICE.seller.gstin}</p>
          </div>
          <div className="px-5 py-3.5 sm:px-6">
            <p className="field-label">Billed to</p>
            <p className="mt-1.5 font-semibold text-ink">{INVOICE.buyer.name}</p>
            <p className="num mt-0.5 text-[0.75rem] text-ink-3">{INVOICE.buyer.gstin}</p>
          </div>
        </div>

        {/* line items */}
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-rule bg-paper/70">
              <th scope="col" className="field-label px-5 py-2.5 text-left sm:px-6">
                Item
              </th>
              <th scope="col" className="field-label hidden px-2 py-2.5 text-left sm:table-cell">
                HSN
              </th>
              <th scope="col" className="field-label px-2 py-2.5 text-right">
                Qty
              </th>
              <th scope="col" className="field-label hidden px-2 py-2.5 text-right sm:table-cell">
                Rate
              </th>
              <th scope="col" className="field-label px-5 py-2.5 text-right sm:px-6">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {INVOICE.items.map((item, i) => (
              <tr
                key={item.name}
                className={`border-b border-rule-2 ${shown(i + 1) ? "animate-row-in" : "invisible"}`}
              >
                <td className="px-5 py-2.5 font-medium text-ink sm:px-6">{item.name}</td>
                <td className="num hidden px-2 py-2.5 text-ink-3 sm:table-cell">{item.hsn}</td>
                <td className="num px-2 py-2.5 text-right text-ink-2">{item.qty}</td>
                <td className="num hidden px-2 py-2.5 text-right text-ink-2 sm:table-cell">
                  {inr(item.rate)}
                </td>
                <td className="num px-5 py-2.5 text-right font-medium text-ink sm:px-6">
                  {inr(item.qty * item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* tax summary */}
        <div className="grid sm:grid-cols-[1fr_minmax(0,15rem)]">
          <div className={`hidden px-6 py-4 sm:block ${shown(7) ? "animate-row-in" : "invisible"}`}>
            <p className="field-label">Amount in words</p>
            <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-2">{INVOICE.words}</p>
          </div>

          <dl className="border-t border-rule text-[0.8125rem] sm:border-l sm:border-t-0">
            {INVOICE.taxRows.map((row) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-3 border-b border-rule-2 px-5 py-2 sm:px-6 ${
                  shown(5) ? "animate-row-in" : "invisible"
                }`}
              >
                <dt className="text-ink-3">{row.label}</dt>
                <dd className="num text-ink-2">{inr(row.value)}</dd>
              </div>
            ))}
            <div
              className={`flex items-center justify-between gap-3 bg-ink px-5 py-3 sm:px-6 ${
                shown(6) ? "animate-row-in" : "invisible"
              }`}
            >
              <dt className="field-label !text-white/55">Total</dt>
              <dd className="num text-[1.0625rem] font-semibold text-white">
                ₹{inr(INVOICE.total)}
              </dd>
            </div>
          </dl>
        </div>

        {/* the payoff */}
        {shown(8) ? (
          <div className="animate-stamp-in pointer-events-none absolute bottom-4 left-5 sm:bottom-5 sm:left-7">
            <div className="rounded-[3px] border-2 border-sales/70 bg-white/85 px-3 py-1.5 backdrop-blur-[2px]">
              <p className="field-label !text-sales" style={{ letterSpacing: "0.1em" }}>
                Posted to GSTR-1 · B2B
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <figcaption className="mt-3 flex items-center gap-2 text-[0.75rem] text-white/45">
        <span
          className="field-label !text-white/40"
          style={{ letterSpacing: "0.16em" }}
        >
          Sample invoice
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        <span className="num text-white/40">Stock &amp; ledger updated on save</span>
      </figcaption>
    </figure>
  );
}
