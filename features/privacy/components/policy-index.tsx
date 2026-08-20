"use client";

import { useEffect, useState } from "react";

import { POLICY_SECTIONS } from "@/features/privacy/content";

/** Sidebar index that tracks which section is on screen. */
export function PolicyIndex() {
  const [active, setActive] = useState<string>(POLICY_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-72px 0px -70% 0px", threshold: 0 },
    );

    POLICY_SECTIONS.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections of this policy" className="lg:sticky lg:top-24 lg:self-start">
      <p className="field-label">Contents</p>
      <ol className="mt-4 flex flex-col gap-0.5 border-l border-rule">
        {POLICY_SECTIONS.map((section, i) => {
          const current = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "true" : undefined}
                className={`-ml-px flex gap-2.5 border-l py-1.5 pl-4 text-[0.875rem] leading-snug transition-colors ${
                  current
                    ? "border-blue font-medium text-ink"
                    : "border-transparent text-ink-3 hover:text-ink-2"
                }`}
              >
                <span className="num text-[0.75rem] pt-px opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{section.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
