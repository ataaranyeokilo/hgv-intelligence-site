export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Contact
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          Questions about weekly lead reports, sample downloads, or industry
          report access? Get in touch and we&apos;ll respond within one working
          day.
        </p>

        <dl className="mt-12 space-y-6 text-sm">
          <div>
            <dt className="font-medium text-neutral-900">Email</dt>
            <dd className="mt-1 text-neutral-600">
              <a
                href="mailto:hello@hgvintelligence.co.uk"
                className="hover:text-neutral-900"
              >
                hello@hgvintelligence.co.uk
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-900">Response time</dt>
            <dd className="mt-1 text-neutral-600">
              Monday to Friday, 9am–5pm GMT
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
