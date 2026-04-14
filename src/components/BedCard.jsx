const statusStyles = {
  available:
    "border-transparent bg-mint text-ink hover:-translate-y-1 hover:shadow-soft",
  occupied: "cursor-not-allowed border-transparent bg-blush/80 text-slatePastel opacity-75",
  selected:
    "border-powder bg-powder text-ink scale-[1.03] shadow-soft ring-4 ring-powder/70",
};

export default function BedCard({ bed, isSelected, onSelect }) {
  const visualState = isSelected ? "selected" : bed.status;

  return (
    <button
      type="button"
      disabled={bed.status === "occupied"}
      onClick={() => onSelect(bed)}
      className={`group flex min-h-[128px] flex-col justify-between rounded-[28px] border px-4 py-4 text-left transition duration-300 ${statusStyles[visualState]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slatePastel">{bed.type}</p>
          <h3 className="mt-2 text-lg font-semibold">{bed.id}</h3>
        </div>
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slatePastel">
          Floor {bed.floor}
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-sm">{bed.ward}</p>
        <div className="flex items-center justify-between text-sm">
          <span>${bed.price}/day</span>
          <span className="font-medium capitalize">{visualState}</span>
        </div>
      </div>
    </button>
  );
}
