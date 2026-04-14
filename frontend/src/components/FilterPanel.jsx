import { formatCurrency } from "../utils/currency";

const fieldClassName =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20";

export default function FilterPanel({ filters, onChange, minPrice, maxPrice }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <label className="space-y-2">
        <span className="text-sm font-medium text-slatePastel">Bed type</span>
        <select
          className={fieldClassName}
          value={filters.type}
          onChange={(event) => onChange("type", event.target.value)}
        >
          <option value="All">All bed types</option>
          <option value="ICU">ICU</option>
          <option value="General">General</option>
          <option value="Private">Private</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slatePastel">Price range</span>
        <select
          className={fieldClassName}
          value={filters.priceRange}
          onChange={(event) => onChange("priceRange", event.target.value)}
        >
          <option value="All">All prices ({formatCurrency(minPrice)} - {formatCurrency(maxPrice)})</option>
          <option value="0-5000">Budget under {formatCurrency(5000)}</option>
          <option value="5001-10000">Mid-range {formatCurrency(5001)} - {formatCurrency(10000)}</option>
          <option value="10001-20000">Premium {formatCurrency(10001)} - {formatCurrency(20000)}</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slatePastel">Availability</span>
        <select
          className={fieldClassName}
          value={filters.availability}
          onChange={(event) => onChange("availability", event.target.value)}
        >
          <option value="All">All statuses</option>
          <option value="available">Available only</option>
          <option value="occupied">Occupied only</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slatePastel">Booking date</span>
        <input
          className={fieldClassName}
          type="date"
          value={filters.date}
          onChange={(event) => onChange("date", event.target.value)}
        />
      </label>
    </div>
  );
}
