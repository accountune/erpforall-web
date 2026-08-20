import { LogoMark } from "@/components/brand/logo-mark";

type LogoProps = {
  /** "lockup" for bars and headers, "stacked" for the footer and legal pages. */
  variant?: "lockup" | "stacked";
  onDark?: boolean;
  className?: string;
};

export function Logo({ variant = "lockup", onDark = false, className = "" }: LogoProps) {
  const erp = (
    <span
      className="display bg-clip-text text-transparent"
      style={{
        backgroundImage: onDark
          ? "linear-gradient(96deg,#7FB6FF 0%,#2E8BFF 55%,#63A6FF 100%)"
          : "linear-gradient(96deg,#0A1B36 0%,#1668E3 62%,#2E8BFF 100%)",
        fontVariationSettings: '"wdth" 118',
        fontWeight: 800,
        letterSpacing: "-0.045em",
      }}
    >
      ERP
    </span>
  );

  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
        <span className="flex items-end gap-2.5">
          <LogoMark className="h-10 w-10" />
          <span className="flex items-baseline gap-1.5 text-[1.75rem] leading-none">
            {erp}
            <span
              className="display"
              style={{
                fontVariationSettings: '"wdth" 100',
                fontWeight: 500,
                fontSize: "0.72em",
                color: onDark ? "rgba(255,255,255,.62)" : "#34496B",
              }}
            >
              for
            </span>
            <span
              className="display"
              style={{
                fontVariationSettings: '"wdth" 108',
                fontWeight: 700,
                fontSize: "0.88em",
                letterSpacing: "-0.03em",
                color: onDark ? "#7FB6FF" : "#1668E3",
              }}
            >
              All
            </span>
          </span>
        </span>
        <span
          className="field-label pl-0.5"
          style={{ color: onDark ? "rgba(255,255,255,.45)" : undefined, letterSpacing: "0.18em" }}
        >
          Smart · Simple · Scalable
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex items-baseline gap-1.5 text-[1.375rem] leading-none">
        {erp}
        <span
          className="display"
          style={{
            fontVariationSettings: '"wdth" 100',
            fontWeight: 500,
            fontSize: "0.72em",
            color: onDark ? "rgba(255,255,255,.62)" : "#34496B",
          }}
        >
          for
        </span>
        <span
          className="display"
          style={{
            fontVariationSettings: '"wdth" 108',
            fontWeight: 700,
            fontSize: "0.88em",
            letterSpacing: "-0.03em",
            color: onDark ? "#7FB6FF" : "#1668E3",
          }}
        >
          All
        </span>
      </span>
    </span>
  );
}
