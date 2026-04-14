import { formatCurrency } from "../utils/currency";

const inputClassName =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-sky focus:ring-4 focus:ring-sky/20";

export default function BookingForm({
  selectedBed,
  bookingDate,
  formData,
  onChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="rounded-[28px] bg-paper p-5 soft-border">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slatePastel">Selected bed</p>
        {selectedBed ? (
          <div className="mt-3 space-y-2 text-sm text-ink">
            <p className="text-lg font-semibold">{selectedBed.id}</p>
            <p>
              {selectedBed.type} bed in {selectedBed.ward}
            </p>
            <p>
              Floor {selectedBed.floor} | {formatCurrency(selectedBed.price)}/day
            </p>
            <p>Booking date: {bookingDate || "Choose a date from filters"}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slatePastel">Choose an available bed to continue with the booking form.</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slatePastel">Patient name</span>
          <input
            required
            disabled={!selectedBed || isSubmitting}
            className={inputClassName}
            type="text"
            placeholder="Enter full name"
            value={formData.patientName}
            onChange={(event) => onChange("patientName", event.target.value)}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slatePastel">Age</span>
          <input
            required
            disabled={!selectedBed || isSubmitting}
            className={inputClassName}
            type="number"
            min="0"
            placeholder="Age"
            value={formData.age}
            onChange={(event) => onChange("age", event.target.value)}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slatePastel">Gender</span>
          <select
            required
            disabled={!selectedBed || isSubmitting}
            className={inputClassName}
            value={formData.gender}
            onChange={(event) => onChange("gender", event.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slatePastel">Contact info</span>
          <input
            required
            disabled={!selectedBed || isSubmitting}
            className={inputClassName}
            type="text"
            placeholder="Phone or email"
            value={formData.contact}
            onChange={(event) => onChange("contact", event.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!selectedBed || isSubmitting}
        className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-soft disabled:cursor-not-allowed disabled:bg-slatePastel"
      >
        {isSubmitting ? "Confirming..." : "Confirm booking"}
      </button>
    </form>
  );
}
