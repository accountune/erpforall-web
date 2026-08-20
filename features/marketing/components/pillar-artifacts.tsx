import { inr } from "@/lib/format";

/* Small, honest reproductions of screens the product actually has. They
   carry more information than a stylised screenshot and stay legible at
   any width. */

function Frame({
  label,
  meta,
  children,
  footer,
}: {
  label: string;
  meta: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="sheet overflow-hidden shadow-[0_18px_44px_-30px_rgba(10,27,54,.45)]">
      <div className="flex items-baseline justify-between gap-4 border-b border-rule px-5 py-3.5">
        <p className="field-label">{label}</p>
        <p className="num text-[0.75rem] text-ink-3">{meta}</p>
      </div>
      {children}
      <div className="border-t border-rule bg-paper/60 px-5 py-3">{footer}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- Billing */

const SERIES = [
  { doc: "Tax invoice", series: "INV/2026-27", last: "0148" },
  { doc: "Bill of supply", series: "BOS/2026-27", last: "0031" },
  { doc: "Delivery challan", series: "DC/2026-27", last: "0092" },
  { doc: "Credit note", series: "CN/2026-27", last: "0014" },
  { doc: "Proforma", series: "PI/2026-27", last: "0057" },
];

export function BillingArtifact() {
  return (
    <Frame label="Document series" meta="FY 2026-27" footer={
      <p className="text-[0.8125rem] text-ink-2">
        <span className="font-semibold text-sales">e-Invoice on</span> — IRN and signed QR are
        fetched the moment an invoice is saved.
      </p>
    }>
      <table className="w-full text-[0.8125rem]">
        <thead>
          <tr className="border-b border-rule">
            <th scope="col" className="field-label px-5 py-2 text-left">Document</th>
            <th scope="col" className="field-label px-3 py-2 text-left">Series</th>
            <th scope="col" className="field-label px-5 py-2 text-right">Last no.</th>
          </tr>
        </thead>
        <tbody>
          {SERIES.map((row) => (
            <tr key={row.doc} className="border-b border-rule-2 last:border-0">
              <td className="px-5 py-2.5 font-medium text-ink">{row.doc}</td>
              <td className="num px-3 py-2.5 text-ink-3">{row.series}</td>
              <td className="num px-5 py-2.5 text-right text-ink-2">{row.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

/* ------------------------------------------------------------------ Stock */

const STOCK = [
  { item: "LED Panel Light 18W", qty: 216, reorder: 100, pct: 82 },
  { item: "Modular Switch 6A", qty: 84, reorder: 250, pct: 26 },
  { item: "PVC Conduit Pipe 25mm", qty: 640, reorder: 200, pct: 100 },
  { item: "Copper Wire 1.5 sq mm", qty: 38, reorder: 60, pct: 18 },
];

export function StockArtifact() {
  return (
    <Frame label="Stock on hand" meta="Shop + Godown A" footer={
      <p className="text-[0.8125rem] text-ink-2">
        <span className="font-semibold text-party">2 items below reorder level</span> — already on
        today&apos;s purchase list.
      </p>
    }>
      <ul className="divide-y divide-rule-2">
        {STOCK.map((row) => {
          const low = row.qty < row.reorder;
          return (
            <li key={row.item} className="px-5 py-3">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.8125rem] font-medium text-ink">{row.item}</p>
                <p className="num shrink-0 text-[0.8125rem] text-ink">
                  {row.qty}
                  <span className="text-ink-3"> / {row.reorder}</span>
                </p>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-1 flex-1 rounded-full bg-rule">
                  <div
                    className={`h-1 rounded-full ${low ? "bg-party" : "bg-stock"}`}
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span
                  className={`field-label shrink-0 ${low ? "!text-party" : "!text-ink-3"}`}
                  style={{ letterSpacing: "0.1em" }}
                >
                  {low ? "Reorder" : "In stock"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

/* -------------------------------------------------------------------- GST */

const GSTR1 = [
  { table: "4A", name: "B2B invoices", count: 128, value: 1842600 },
  { table: "5A", name: "B2C large", count: 12, value: 310450 },
  { table: "7", name: "B2C others", count: 431, value: 688120 },
  { table: "9B", name: "Credit / debit notes", count: 6, value: -52300 },
];

export function GstArtifact() {
  return (
    <Frame label="GSTR-1 summary" meta="Jul 2026 · 27AAFCE1234K1ZP" footer={
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.8125rem] text-ink-2">
          <span className="font-semibold text-report">Checks passed</span> — no missing GSTIN, HSN
          or place of supply.
        </p>
        <span className="field-label !text-blue">Export JSON →</span>
      </div>
    }>
      <table className="w-full text-[0.8125rem]">
        <thead>
          <tr className="border-b border-rule">
            <th scope="col" className="field-label px-5 py-2 text-left">Table</th>
            <th scope="col" className="field-label px-3 py-2 text-right">Count</th>
            <th scope="col" className="field-label px-5 py-2 text-right">Taxable value</th>
          </tr>
        </thead>
        <tbody>
          {GSTR1.map((row) => (
            <tr key={row.table} className="border-b border-rule-2">
              <td className="px-5 py-2.5">
                <span className="num text-ink-3">{row.table}</span>
                <span className="ml-2 font-medium text-ink">{row.name}</span>
              </td>
              <td className="num px-3 py-2.5 text-right text-ink-2">{row.count}</td>
              <td className="num px-5 py-2.5 text-right text-ink">{inr(row.value)}</td>
            </tr>
          ))}
          <tr className="bg-paper/70">
            <td className="field-label px-5 py-2.5">Total</td>
            <td className="num px-3 py-2.5 text-right font-semibold text-ink">577</td>
            <td className="num px-5 py-2.5 text-right font-semibold text-ink">
              {inr(1842600 + 310450 + 688120 - 52300)}
            </td>
          </tr>
        </tbody>
      </table>
    </Frame>
  );
}

export const ARTIFACTS: Record<string, () => React.JSX.Element> = {
  billing: BillingArtifact,
  stock: StockArtifact,
  gst: GstArtifact,
};
