/**
 * Single source of truth for everything that differs between a demo build
 * and the live site. Replace the placeholder block before going live —
 * the privacy policy, footer and metadata all read from here.
 */

/**
 * The product lives on its own subdomain — this site never hosts an account
 * screen. Signing up and signing in both hand off to it. If your app does not
 * serve /signup and /login, point signupUrl and loginUrl at APP_URL directly.
 */
const APP_URL = "https://app.erpforall.com";

export const SITE = {
  name: "ERP for All",
  tagline: "Smart · Simple · Scalable",
  description:
    "Cloud accounting software for Indian businesses. Raise GST invoices, keep stock accurate in real time, and export GSTR-1 and GSTR-3B without rework.",

  /* ---- replace before launch ---------------------------------------- */
  url: "https://erpforall.in",
  appUrl: APP_URL,
  signupUrl: `${APP_URL}/signup`,
  loginUrl: `${APP_URL}/login`,
  legalEntity: "ERP for All Technologies Private Limited",
  address: "Replace with your registered office address, city, state, PIN",
  email: "support@erpforall.in",
  privacyEmail: "privacy@erpforall.in",
  grievanceOfficer: "Replace with the name of your Grievance Officer",
  /* -------------------------------------------------------------------- */

  policyEffectiveFrom: "1 August 2026",
  policyLastUpdated: "19 August 2026",
} as const;

export const NAV = [
  { label: "Billing", href: "/#billing" },
  { label: "Stock", href: "/#stock" },
  { label: "GST reports", href: "/#gst" },
  { label: "How it works", href: "/#flow" },
  { label: "FAQ", href: "/#faq" },
] as const;
