export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      <span className="inline-flex rounded-full bg-lavender px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slatePastel">
        {eyebrow}
      </span>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-ink md:text-3xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-slatePastel md:text-base">{description}</p>
      </div>
    </div>
  );
}
