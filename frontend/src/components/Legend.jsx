const legendItems = [
  { label: "Available", color: "bg-sky" },
  { label: "Occupied", color: "bg-accent" },
  { label: "Selected", color: "bg-primary" },
];

export default function Legend() {
  return (
    <div className="flex flex-wrap gap-3">
      {legendItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slatePastel shadow-sm"
        >
          <span className={`h-3 w-3 rounded-full ${item.color}`} />
          {item.label}
        </div>
      ))}
    </div>
  );
}
