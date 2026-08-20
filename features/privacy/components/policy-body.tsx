import { POLICY_SECTIONS } from "@/features/privacy/content";
import { SITE } from "@/lib/site";

type SectionProps = { id: (typeof POLICY_SECTIONS)[number]["id"]; children: React.ReactNode };

function Section({ id, children }: SectionProps) {
  const index = POLICY_SECTIONS.findIndex((section) => section.id === id);
  const section = POLICY_SECTIONS[index];

  return (
    <section id={id} className="scroll-mt-24">
      <h2>
        <span className="num mr-3 text-[0.875rem] font-medium text-blue align-middle">
          {String(index + 1).padStart(2, "0")}
        </span>
        {section.title}
      </h2>
      {children}
    </section>
  );
}

export function PolicyBody() {
  return (
    <div className="prose-legal max-w-[68ch]">
      <p className="text-[1.0625rem] leading-relaxed text-ink-2">
        {SITE.legalEntity} builds and runs {SITE.name}, cloud software for billing, stock management
        and GST reporting. This policy explains what personal data we handle, why we handle it, and
        what you can ask us to do about it. It is written to be read, not filed — if anything here
        is unclear, write to us and we will explain it.
      </p>

      <Section id="scope">
        <p>
          This policy applies to the {SITE.name} web application, our websites, and the support we
          provide over email and chat. It covers visitors to our site, people who sign up for
          a trial, and the users of a subscribing business.
        </p>
        <p>
          It does not cover third-party sites we link to, or what a subscribing business does with
          data inside its own account beyond the terms of its subscription.
        </p>
      </Section>

      <Section id="roles">
        <p>
          There are two different kinds of data in {SITE.name}, and we treat them differently.
        </p>
        <h3>Data about you, our customer</h3>
        <p>
          When you sign up, contact support or pay us, we decide why and how that information is
          used. Under the Digital Personal Data Protection Act, 2023, we are the{" "}
          <strong>Data Fiduciary</strong> for it, and you are the Data Principal.
        </p>
        <h3>Data you enter about your business</h3>
        <p>
          Your invoices, parties, item masters, ledgers and returns — including the names, addresses,
          GSTINs and phone numbers of your own customers and suppliers — belong to your business. You
          decide what goes in and why. For that data we act as a <strong>Data Processor</strong>: we
          store and process it on your instructions so the software works, and for nothing else.
        </p>
        <ul>
          <li>We do not sell your business data, and we never have.</li>
          <li>We do not use it to train models or build products for anyone else.</li>
          <li>
            We do not mine it for marketing, and we do not share it with other customers in any form,
            aggregated or otherwise.
          </li>
          <li>
            Our staff access an account only when you ask us to, or when it is strictly necessary to
            fix a fault. Every such access is logged.
          </li>
        </ul>
        <p>
          Because you decide what personal data goes into your account, you are responsible for
          having a lawful basis to collect it from your own customers and for answering their
          requests. We will help you do that — see <a href="#rights">Your rights</a>.
        </p>
      </Section>

      <Section id="collect">
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Account details</strong> — name, business name, email address, mobile number,
            GSTIN, business address and state.
          </li>
          <li>
            <strong>Billing details</strong> — plan, invoices we raise to you, and payment status.
            Card and bank details are entered on our payment gateway&apos;s page and are held by
            them, not by us. We keep only the last four digits and the instrument type.
          </li>
          <li>
            <strong>Business records</strong> — everything you or your users create in the app:
            invoices, purchases, parties, items, stock movements, ledgers and returns.
          </li>
          <li>
            <strong>Support conversations</strong> — the emails, chats, call notes and any files or
            screenshots you send us.
          </li>
        </ul>

        <h3>Information we collect automatically</h3>
        <ul>
          <li>
            <strong>Log data</strong> — IP address, browser and device type, operating system, pages
            and screens used, timestamps, and error traces.
          </li>
          <li>
            <strong>Audit trail</strong> — which user in your account created, edited or deleted a
            document, and when. This is a feature of the product, and we keep it for your benefit as
            much as ours.
          </li>
          <li>
            <strong>Cookies</strong> — see <a href="#cookies">Cookies</a> below.
          </li>
        </ul>

        <h3>What we do not collect</h3>
        <p>
          We do not ask for and do not want your Aadhaar number, biometric data, health data, caste
          or religion, or your GST portal password. If you send any of it to support by mistake, tell
          us and we will delete it.
        </p>
      </Section>

      <Section id="use">
        <p>We use the information above to:</p>
        <ul>
          <li>Create your account, authenticate users, and run the software you are paying for.</li>
          <li>
            Generate invoices, e-invoices (IRN and signed QR), e-way bills, stock records and GST
            returns from what you enter.
          </li>
          <li>Take payment, raise invoices to you, and keep our own statutory books.</li>
          <li>Answer support requests, and diagnose faults you report.</li>
          <li>
            Send service messages — renewal reminders, downtime notices, security alerts and material
            changes to this policy. You cannot opt out of these while you hold an account, because
            they are part of the service.
          </li>
          <li>
            Send product news and offers, only if you have opted in. Every such message carries an
            unsubscribe link that works.
          </li>
          <li>
            Keep the service secure and reliable — rate limiting, fraud and abuse prevention, backup
            and capacity planning.
          </li>
          <li>
            Understand which features are used, in aggregate, so we know what to improve. This is
            counted at the level of the feature, not the contents of your books.
          </li>
          <li>Meet obligations under tax, company and other applicable law.</li>
        </ul>
      </Section>

      <Section id="basis">
        <p>We process personal data on one of the following grounds:</p>
        <ul>
          <li>
            <strong>Your consent</strong>, given at sign-up or when you tick a box — for example for
            marketing email. You can withdraw it at any time, as easily as you gave it, and
            withdrawing it does not affect what we did lawfully before.
          </li>
          <li>
            <strong>Performance of the contract</strong> between us — we cannot run your account
            without processing your account and business data.
          </li>
          <li>
            <strong>Legitimate uses recognised under the DPDP Act, 2023</strong> and compliance with
            law — including keeping records that the CGST Act, the Income-tax Act and the Companies
            Act require us to keep.
          </li>
        </ul>
      </Section>

      <Section id="sharing">
        <p>
          We share personal data only with the parties below, only to the extent each one needs, and
          only under a written contract that binds them to confidentiality and to security standards
          at least as strong as ours.
        </p>
        <ul>
          <li>
            <strong>Cloud hosting and infrastructure</strong> — the provider that runs our servers,
            databases and backups.
          </li>
          <li>
            <strong>GST Suvidha Provider / Invoice Registration Portal</strong> — when you generate
            an e-invoice or an e-way bill, the invoice details are sent to the government portal
            through our GSP, because that is what the law requires for the document to be valid.
          </li>
          <li>
            <strong>Payment gateway</strong> — to collect your subscription payment.
          </li>
          <li>
            <strong>Email, SMS and WhatsApp providers</strong> — to deliver the messages you ask the
            software to send, and our own service messages to you.
          </li>
          <li>
            <strong>Error and analytics tooling</strong> — to see that something broke and where.
          </li>
          <li>
            <strong>Professional advisers</strong> — auditors and lawyers, bound by professional
            confidentiality.
          </li>
          <li>
            <strong>Law enforcement, courts and regulators</strong> — where we are legally compelled.
            Unless we are forbidden from telling you, we will tell you before we hand anything over.
          </li>
          <li>
            <strong>A buyer or successor</strong>, if the business is sold or merges. You will be
            told before your data moves, and this policy continues to apply until you are given a new
            one.
          </li>
        </ul>
        <p>
          We do not sell personal data, and we do not share it with advertising networks or data
          brokers.
        </p>
      </Section>

      <Section id="location">
        <p>
          Your account data and business records are stored on servers located in India. Backups are
          held in India as well.
        </p>
        <p>
          A small number of the service providers listed above may process limited data — such as an
          email address or an error report — outside India. Where that happens we transfer only what
          is necessary, under contractual safeguards, and only to countries not restricted by the
          Central Government under the DPDP Act, 2023.
        </p>
      </Section>

      <Section id="security">
        <p>We take the following measures, and we keep them under review:</p>
        <ul>
          <li>TLS encryption for all traffic between your browser and our servers.</li>
          <li>Encryption at rest for databases, file storage and backups.</li>
          <li>
            Passwords stored only as salted hashes, never in readable form, with optional two-factor
            authentication on every account.
          </li>
          <li>
            Role-based access inside the product, so you can limit what each of your own users can
            see and do.
          </li>
          <li>
            Least-privilege access for our staff, reviewed regularly, with every production access
            logged.
          </li>
          <li>Continuous encrypted backups, retained for 30 days, with restores tested.</li>
          <li>Monitoring, rate limiting and alerting on unusual activity.</li>
        </ul>
        <p>
          No system is perfectly secure. If a breach affects your personal data we will notify you
          and the Data Protection Board of India as required, describing what happened, what data was
          involved, and what we are doing about it.
        </p>
        <p>
          Your part matters too: use a strong, unique password, turn on two-factor authentication,
          remove users who leave, and never share a login between people.
        </p>
      </Section>

      <Section id="retention">
        <ul>
          <li>
            <strong>While your subscription is active</strong> — we keep your account and business
            data so the software works.
          </li>
          <li>
            <strong>After you cancel</strong> — the account moves to read-only. You can export
            everything for 90 days. After that we delete or irreversibly anonymise the account data,
            unless the law requires us to hold it.
          </li>
          <li>
            <strong>Records we must keep</strong> — invoices we raised to you and the accounting
            entries behind them are retained for at least 72 months as required by Section 36 of the
            CGST Act, 2017, and for eight financial years where Section 128 of the Companies Act,
            2013 applies.
          </li>
          <li>
            <strong>Backups</strong> — deleted data can persist in encrypted backups for up to 30
            days before it ages out.
          </li>
          <li>
            <strong>Logs</strong> — server and security logs are kept for up to 180 days.
          </li>
          <li>
            <strong>Support conversations</strong> — kept for 24 months, so we have the history when
            you come back to an old issue.
          </li>
        </ul>
        <p>
          You can ask us to delete your data sooner. We will do it, except for the records the law
          requires us to keep, and we will tell you exactly what was kept and why.
        </p>
      </Section>

      <Section id="rights">
        <p>Under the DPDP Act, 2023 you can ask us to:</p>
        <ul>
          <li>
            <strong>Tell you what we hold</strong> — a summary of the personal data we process about
            you and who we have shared it with.
          </li>
          <li>
            <strong>Correct or complete it</strong> — if something about you is wrong or out of date.
          </li>
          <li>
            <strong>Erase it</strong> — where we no longer need it and no law requires us to keep it.
          </li>
          <li>
            <strong>Withdraw consent</strong> — for anything you consented to, including marketing.
          </li>
          <li>
            <strong>Nominate someone</strong> — to exercise these rights on your behalf if you die or
            become incapacitated.
          </li>
          <li>
            <strong>Raise a grievance</strong> — and get an answer. See{" "}
            <a href="#grievance">below</a>.
          </li>
        </ul>
        <p>
          Write to <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a> from the email
          address on your account. We will verify who you are and respond within 30 days. There is no
          charge.
        </p>
        <h3>If you are a customer of one of our subscribers</h3>
        <p>
          If your details appear in someone&apos;s {SITE.name} account because you bought from them
          or sold to them, that business is the Data Fiduciary, not us. Please contact them directly.
          If you cannot reach them, write to us and we will pass the request on and follow up.
        </p>
      </Section>

      <Section id="cookies">
        <p>We keep this simple. We set two kinds of cookie:</p>
        <ul>
          <li>
            <strong>Essential</strong> — to keep you signed in, remember which business you are
            working in, and protect against cross-site request forgery. The product does not work
            without these, so they are not optional.
          </li>
          <li>
            <strong>Analytics</strong> — to count page visits and feature usage so we know what to
            improve. These are set only if you accept them, and you can change your mind at any time.
          </li>
        </ul>
        <p>
          We do not run advertising or cross-site tracking cookies. Blocking cookies in your browser
          will sign you out and may break parts of the app.
        </p>
      </Section>

      <Section id="children">
        <p>
          {SITE.name} is business software and is not directed at children. We do not knowingly
          create accounts for anyone under 18. If we learn that we hold a child&apos;s personal data
          without verifiable parental consent, we will delete it.
        </p>
      </Section>

      <Section id="changes">
        <p>
          When this policy changes we will update the date at the top of the page. If the change
          materially affects how we handle your personal data we will email every account holder at
          least 15 days before it takes effect, so you have time to read it and object.
        </p>
        <p>Earlier versions are available on request.</p>
      </Section>

      <Section id="grievance">
        <p>
          If you have a question or a complaint about how we handle personal data, write to our
          Grievance Officer. We answer every grievance, and we aim to resolve it within 30 days.
        </p>
        <ul>
          <li>
            <strong>Grievance Officer:</strong> {SITE.grievanceOfficer}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>
          </li>
          <li>
            <strong>Post:</strong> {SITE.legalEntity}, {SITE.address}
          </li>
        </ul>
        <p>
          If you are not satisfied with our answer, you may complain to the Data Protection Board of
          India under the Digital Personal Data Protection Act, 2023.
        </p>
      </Section>
    </div>
  );
}
