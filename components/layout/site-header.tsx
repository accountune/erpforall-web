import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/ui/mobile-nav";
import { NAV, SITE } from "@/lib/site";

/**
 * A dark masthead on every page. On the home page it merges into the hero
 * so the top of the site reads as one field; elsewhere it sits above the
 * page-title band the same way.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="ERP for All — home" className="shrink-0">
          <Logo onDark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-rule whitespace-nowrap text-[0.9375rem] font-medium text-white/70 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          {/* Both of these leave the site for the app subdomain. */}
          <Link
            href={SITE.loginUrl}
            className="link-rule whitespace-nowrap text-[0.9375rem] font-medium text-white/70 hover:text-white"
          >
            Log in
          </Link>
          <span aria-hidden="true" className="h-5 w-px bg-white/15" />
          <Link href="/#demo" className="btn btn-on-navy">
            Book a demo
          </Link>
          <Link href={SITE.signupUrl} className="btn btn-primary">
            Start free trial
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
