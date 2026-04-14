export default function DashboardCard({ title, children, accentClassName = "bg-white" }) {
  return (
    <div className="glass-panel rounded-[30px] border border-white/70 p-5 shadow-soft">
      <div className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slatePastel ${accentClassName}`}>
        {title}
      </div>
      <div className="h-72">{children}</div>
    </div>
  );
}
