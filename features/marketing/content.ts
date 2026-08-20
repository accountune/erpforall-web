import type { Capability, Faq, InvoiceItem, Pillar, WorkflowStep } from "./model";

/* ------------------------------------------------------------------
   Hero invoice — fictional sample data, arithmetic is real:
   taxable 29,165.00 + CGST 9% + SGST 9% = 34,414.70, rounded to 34,415.00
   ------------------------------------------------------------------ */

const items: InvoiceItem[] = [
  { name: "LED Panel Light 18W", hsn: "9405", qty: 24, rate: 385 },
  { name: "Modular Switch 6A", hsn: "8536", qty: 60, rate: 78.75 },
  { name: "PVC Conduit Pipe 25mm", hsn: "3917", qty: 40, rate: 132 },
  { name: "Copper Wire 1.5 sq mm", hsn: "8544", qty: 8, rate: 1240 },
];

const taxable = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
const cgst = taxable * 0.09;

export const INVOICE = {
  number: "INV/2026-27/0148",
  date: "19-08-2026",
  seller: { name: "Deepak Electricals", gstin: "27AAFCE1234K1ZP" },
  buyer: { name: "Nakoda Traders", gstin: "27AAGCB5678L1ZQ" },
  items,
  taxRows: [
    { label: "Taxable value", value: taxable },
    { label: "CGST 9%", value: cgst },
    { label: "SGST 9%", value: cgst },
    { label: "Round off", value: 0.3 },
  ],
  total: 34415,
  words: "Thirty four thousand four hundred fifteen rupees only",
} as const;

/* ------------------------------------------------------------------
   Compliance strip
   ------------------------------------------------------------------ */

export const COMPLIANCE = [
  { label: "e-Invoice", detail: "IRN + signed QR" },
  { label: "e-Way bill", detail: "Generated from the invoice" },
  { label: "GSTR-1", detail: "B2B, B2C, HSN, CDNR" },
  { label: "GSTR-3B", detail: "Summary + ITC" },
  { label: "GSTR-2B", detail: "Purchase reconciliation" },
] as const;

/* ------------------------------------------------------------------
   The three pillars
   ------------------------------------------------------------------ */

export const PILLARS: Pillar[] = [
  {
    id: "billing",
    index: "01",
    eyebrow: "Billing",
    title: "Invoices that are already compliant when you print them",
    lede: "Pick the party, add the items, save. Tax rates come off the item master, the CGST/SGST/IGST split follows the place of supply, and the invoice is ready to print, email or send on WhatsApp.",
    points: [
      {
        term: "Every document type",
        detail:
          "Tax invoice, bill of supply, delivery challan, proforma, credit and debit notes — numbered in their own series.",
      },
      {
        term: "e-Invoice and e-way bill",
        detail:
          "Push to the IRP for an IRN and signed QR, then raise the e-way bill from the same screen. No re-keying on the portal.",
      },
      {
        term: "Counter-fast entry",
        detail:
          "Scan a barcode or type three letters. Keyboard shortcuts cover the whole billing screen so you never reach for the mouse.",
      },
      {
        term: "Money in, chased for you",
        detail:
          "Record part payments, attach UPI QR to the invoice, and let reminders go out on the schedule you set.",
      },
    ],
    accent: "sales",
  },
  {
    id: "stock",
    index: "02",
    eyebrow: "Stock",
    title: "A stock figure you can act on, not one you reconcile later",
    lede: "Sales, purchases, returns and transfers all write to the same stock ledger the moment they are saved. What the screen shows is what is on the rack.",
    points: [
      {
        term: "Godowns and branches",
        detail:
          "Track quantity per location, move stock between them, and see valuation for each one separately.",
      },
      {
        term: "Batches and expiry",
        detail:
          "Bill by batch with FIFO or manual pick, and get warned before short-dated goods go out.",
      },
      {
        term: "Reorder alerts",
        detail:
          "Set a reorder level per item. When stock crosses it, the item shows up on the purchase list with a suggested quantity.",
      },
      {
        term: "Physical count, reconciled",
        detail:
          "Count on a phone, upload the sheet, and post the difference as a stock adjustment with a reason against it.",
      },
    ],
    accent: "stock",
  },
  {
    id: "gst",
    index: "03",
    eyebrow: "GST reports",
    title: "Filing becomes a review instead of a rebuild",
    lede: "Each document lands in the right return table as it is saved. On filing day you are checking figures, not assembling them from a spreadsheet.",
    points: [
      {
        term: "Returns, ready to file",
        detail:
          "GSTR-1 and GSTR-3B built from your books, exported as JSON for the portal or handed to your CA.",
      },
      {
        term: "GSTR-2B reconciliation",
        detail:
          "Match purchase entries against the portal's 2B, and see exactly which supplier is holding up your input credit.",
      },
      {
        term: "Checks before you file",
        detail:
          "Missing GSTINs, HSN gaps, wrong place of supply and rate mismatches are flagged as a list you can work through.",
      },
      {
        term: "The books behind them",
        detail:
          "Trial balance, P&L, balance sheet, party ledgers and ageing — with drill-down from any figure to the document that made it.",
      },
    ],
    accent: "report",
  },
];

/* ------------------------------------------------------------------
   How it works — a genuine sequence, which is why it is numbered
   ------------------------------------------------------------------ */

export const WORKFLOW: WorkflowStep[] = [
  {
    step: "01",
    title: "You raise the bill",
    detail:
      "Party, items, quantity. Rates and HSN codes are already on the item, so the tax works itself out as you type.",
    accent: "sales",
  },
  {
    step: "02",
    title: "Stock and ledgers move on save",
    detail:
      "Quantity leaves the godown, the party ledger is debited, and the sales account is credited — in the same instant, from the same entry.",
    accent: "stock",
  },
  {
    step: "03",
    title: "The return is already written",
    detail:
      "That invoice is sitting in GSTR-1 B2B before you close the screen. At month end you review the summary and export.",
    accent: "report",
  },
];

/* ------------------------------------------------------------------
   Everything else
   ------------------------------------------------------------------ */

export const CAPABILITIES: Capability[] = [
  {
    title: "Multi-business",
    detail: "Run several GSTINs from one login and switch between them without signing out.",
  },
  {
    title: "Roles and limits",
    detail: "Give a biller the billing screen only. Keep purchase rates and reports to yourself.",
  },
  {
    title: "Your CA, invited",
    detail: "Add your accountant as a read-only user at no extra seat cost.",
  },
  {
    title: "Barcode and label printing",
    detail: "Print item labels with price and barcode, then bill by scanning them.",
  },
  {
    title: "Works on the phone",
    detail: "Bill, check stock and view outstandings from a browser on any device.",
  },
  {
    title: "Tally-friendly export",
    detail: "Export vouchers and masters in a format your existing accountant can import.",
  },
  {
    title: "Backups you don't run",
    detail: "Encrypted snapshots are taken continuously and retained for 30 days.",
  },
  {
    title: "Your data, exportable",
    detail: "Download the full ledger, item master and document history as Excel whenever you want.",
  },
];

/* ------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------ */

export const FAQS: Faq[] = [
  {
    question: "Is there anything to install?",
    answer:
      "No. ERP for All runs in the browser, so a laptop at the counter and a phone in the godown see the same books. Updates and GST rate changes reach you without a download.",
  },
  {
    question: "Can my CA work in the same account?",
    answer:
      "Yes. Invite your accountant as a read-only user and the seat is free. They can pull GSTR-1, GSTR-3B, the trial balance and party ledgers themselves, so the month-end email thread stops.",
  },
  {
    question: "Does it generate e-invoices and e-way bills?",
    answer:
      "Yes. Register your GSTIN once, and invoices above the threshold are sent to the IRP for an IRN and signed QR. The e-way bill is raised from the same invoice with the transporter details filled in.",
  },
  {
    question: "What happens to my data if I stop paying?",
    answer:
      "Your account moves to read-only rather than being deleted. You can export the complete ledger, item master, party master and every document as Excel for 90 days after the subscription ends, and you can ask us to delete it sooner.",
  },
  {
    question: "What if the internet goes down mid-bill?",
    answer:
      "The billing screen keeps working on a slow or dropped connection and queues the invoice locally, then syncs the moment the line is back. Numbering stays in sequence, so nothing is lost or duplicated.",
  },
  {
    question: "Can I bring in the data I already have?",
    answer:
      "Import items, parties and opening balances from Excel or a Tally export during setup. We check the file for duplicate GSTINs and missing HSN codes before anything is written.",
  },
];
