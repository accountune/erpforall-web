const inrFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 29165 → "29,165.00" — Indian grouping, two decimals, no symbol. */
export const inr = (value: number) => inrFormatter.format(value);
