"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { NAV, SITE } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* The header carries a backdrop-filter, which makes it the containing
     block for fixed children. The panel therefore has to live on <body>. */
  const panel = (
    <div
      id="mobile-nav-panel"
      className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-navy px-5 py-6 xl:hidden"
    >
      <nav aria-label="Primary" className="divide-y divide-white/10 border-y border-white/10">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between py-4 text-lg font-medium text-white"
          >
            {item.label}
            <span aria-hidden="true" className="text-white/35">
              →
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-6 grid gap-3">
        <Link href={SITE.signupUrl} onClick={() => setOpen(false)} className="btn btn-primary w-full">
          Start free trial
        </Link>
        <Link href="/#demo" onClick={() => setOpen(false)} className="btn btn-on-navy w-full">
          Book a demo
        </Link>
        <Link
          href={SITE.loginUrl}
          onClick={() => setOpen(false)}
          className="link-rule mt-1 justify-self-start text-[0.9375rem] font-medium text-white/70"
        >
          Log in to your account
        </Link>
      </div>

      <p className="field-label mt-8 !text-white/35">{SITE.tagline}</p>
    </div>
  );

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/20 bg-white/5"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <g stroke="#fff" strokeWidth="1.75" strokeLinecap="round">
            {open ? (
              <>
                <path d="M2 2l14 10" />
                <path d="M16 2L2 12" />
              </>
            ) : (
              <>
                <path d="M1 2h16" />
                <path d="M1 7h16" />
                <path d="M1 12h11" />
              </>
            )}
          </g>
        </svg>
      </button>

      {mounted && open ? createPortal(panel, document.body) : null}
    </div>
  );
}
