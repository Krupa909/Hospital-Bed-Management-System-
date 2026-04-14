export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      <span className="inline-flex rounded-full border border-primary/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary shadow-sm">
        {eyebrow}
      </span>
      <div className="space-y-2">
        <h2 className="font-display text-3xl font-semibold leading-none text-ink md:text-[2.75rem]">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-slatePastel md:text-[15px]">{description}</p>
      </div>
    </div>
  );
}
