type LogoMarkProps = {
  className?: string;
  title?: string;
};

/**
 * The orbit ring from the ERP for All identity: a sweep that opens at the
 * upper left, arcs over the top and closes with a dot at the lower right,
 * carrying the four module discs. Each disc keeps its own colour because
 * that colour is reused across the site for the module it stands for —
 * reports (blue), sales (green), parties (amber), stock (violet).
 */
export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 104 104"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="erp-orbit" x1="10" y1="20" x2="86" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E8BFF" />
          <stop offset="1" stopColor="#1668E3" />
        </linearGradient>
      </defs>

      {/* the sweep */}
      <path
        d="M7.4 45.1 A42 42 0 1 1 77.7 85.7"
        stroke="url(#erp-orbit)"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <circle cx="69" cy="92.4" r="3.6" fill="#1668E3" />

      {/* reports — bar chart */}
      <g transform="translate(65.5 20)">
        <circle r="12" fill="#1668E3" />
        <g fill="#fff">
          <rect x="-5.4" y="-0.6" width="2.7" height="5.1" rx="0.6" />
          <rect x="-1.35" y="-3.6" width="2.7" height="8.1" rx="0.6" />
          <rect x="2.7" y="-5.4" width="2.7" height="9.9" rx="0.6" />
        </g>
      </g>

      {/* sales — cart */}
      <g transform="translate(83.3 37.2)">
        <circle r="12" fill="#1EA05B" />
        <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-5.8-4.4h2.3l1.6 7.2h6.6l1.5-5.1h-8.6" />
        </g>
        <g fill="#fff">
          <circle cx="-1.2" cy="5.2" r="1.35" />
          <circle cx="3.9" cy="5.2" r="1.35" />
        </g>
      </g>

      {/* parties — people */}
      <g transform="translate(87.6 61.6)">
        <circle r="12" fill="#E8990F" />
        <g fill="#fff">
          <circle cx="-3.6" cy="-1.9" r="1.9" />
          <path d="M-7.4 4.9c0-2.3 1.5-3.8 3.5-3.8h.6c-.5.8-.8 1.8-.8 3v.8z" />
          <circle cx="1.5" cy="-2.6" r="2.4" />
          <path d="M-2.8 5c0-2.9 1.9-4.7 4.3-4.7s4.3 1.8 4.3 4.7z" />
        </g>
      </g>

      {/* stock — gear */}
      <g transform="translate(76.8 83.8)">
        <circle r="12" fill="#7A4FCB" />
        <g fill="#fff">
          <rect x="-1.15" y="-6.6" width="2.3" height="13.2" rx="0.8" />
          <rect x="-1.15" y="-6.6" width="2.3" height="13.2" rx="0.8" transform="rotate(45)" />
          <rect x="-1.15" y="-6.6" width="2.3" height="13.2" rx="0.8" transform="rotate(90)" />
          <rect x="-1.15" y="-6.6" width="2.3" height="13.2" rx="0.8" transform="rotate(135)" />
          <circle r="5" />
        </g>
        <circle r="2.1" fill="#7A4FCB" />
      </g>
    </svg>
  );
}
