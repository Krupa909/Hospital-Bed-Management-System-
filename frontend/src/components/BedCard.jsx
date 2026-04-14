import { formatCurrency } from "../utils/currency";

const statusStyles = {
  available:
    "border-sky/15 bg-white text-ink hover:-translate-y-1 hover:border-sky/40 hover:shadow-soft",
  occupied: "cursor-not-allowed border-accent/10 bg-[#F8E2DE] text-slatePastel opacity-80",
  selected:
    "border-primary/25 bg-[#F8E7D7] text-ink scale-[1.02] shadow-soft ring-4 ring-primary/10",
};

const badgeStyles = {
  available: "bg-sky/12 text-sky",
  occupied: "bg-accent/10 text-accent",
  selected: "bg-primary/10 text-primary",
};

const typeStyles = {
  ICU: "text-primary",
  General: "text-navy",
  Private: "text-sky",
};

export default function BedCard({ bed, isSelected, onSelect }) {
  const visualState = isSelected ? "selected" : bed.status;

  return (
    <button
      type="button"
      disabled={bed.status === "occupied"}
      onClick={() => onSelect(bed)}
      className={`group flex min-h-[220px] flex-col justify-between rounded-[28px] border p-5 text-left transition duration-300 ${statusStyles[visualState]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-[0.24em] ${typeStyles[bed.type]}`}>
              {bed.type}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${badgeStyles[visualState]}`}>
              {visualState}
            </span>
          </div>
          <h3 className="text-[2rem] font-semibold leading-none tracking-tight">{bed.id.split("-")[1]}</h3>
          <p className="text-lg font-semibold leading-none">{bed.id}</p>
        </div>
        <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-slatePastel">
          Floor {bed.floor}
        </span>
      </div>

      <div className="space-y-3">
        <p className="min-h-[56px] text-base font-medium leading-7 text-ink">{bed.ward}</p>
        <div className="flex items-center justify-between border-t border-line pt-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slatePastel">Price</p>
            <p className="mt-1 text-lg font-semibold">{formatCurrency(bed.price)}/day</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-slatePastel">Room Type</p>
            <p className="mt-1 font-semibold text-ink">{bed.type}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
