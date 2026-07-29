type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
