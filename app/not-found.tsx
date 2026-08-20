import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-start px-5 py-24 sm:px-8 lg:py-32">
      <p className="field-label">Error 404</p>
      <h1 className="display mt-5 max-w-xl text-[clamp(2rem,5vw,3rem)]">
        This voucher does not exist
      </h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-ink-2">
        The page you asked for has been moved or was never here. The links below will get you back.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/#demo" className="btn btn-ghost">
          Book a demo
        </Link>
      </div>
    </section>
  );
}
