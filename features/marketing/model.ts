export type InvoiceItem = {
  name: string;
  hsn: string;
  qty: number;
  rate: number;
};

export type Pillar = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  points: { term: string; detail: string }[];
  accent: "sales" | "stock" | "report";
};

export type WorkflowStep = {
  step: string;
  title: string;
  detail: string;
  accent: "sales" | "stock" | "report";
};

export type Capability = {
  title: string;
  detail: string;
};

export type Faq = {
  question: string;
  answer: string;
};
