import { Capabilities } from "@/features/marketing/components/capabilities";
import { CtaBand } from "@/features/marketing/components/cta-band";
import { Faq } from "@/features/marketing/components/faq";
import { Hero } from "@/features/marketing/components/hero";
import { Pillars } from "@/features/marketing/components/pillars";
import { Workflow } from "@/features/marketing/components/workflow";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Workflow />
      <Capabilities />
      <Faq />
      <CtaBand />
    </>
  );
}
