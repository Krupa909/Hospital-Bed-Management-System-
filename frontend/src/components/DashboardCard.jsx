export default function DashboardCard({ title, children, accentClassName = "bg-white" }) {
  return (
    <div className="glass-panel soft-border rounded-[30px] p-5 shadow-soft">
      <div className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slatePastel ${accentClassName}`}>
        {title}
      </div>
      <div className="h-72">{children}</div>
    </div>
  );
}
