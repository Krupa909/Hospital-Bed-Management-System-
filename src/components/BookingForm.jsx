const inputClassName =
  "w-full rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-powder focus:ring-4 focus:ring-powder/60";

export default function BookingForm({
  selectedBed,
  bookingDate,
  formData,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="rounded-[28px] bg-mist p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slatePastel">Selected bed</p>
        {selectedBed ? (
          <div className="mt-3 space-y-2 text-sm text-ink">
            <p className="text-lg font-semibold">{selectedBed.id}</p>
            <p>
              {selectedBed.type} bed in {selectedBed.ward}
            </p>
            <p>
              Floor {selectedBed.floor} | ${selectedBed.price}/day
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
            disabled={!selectedBed}
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
            disabled={!selectedBed}
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
            disabled={!selectedBed}
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
            disabled={!selectedBed}
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
        disabled={!selectedBed}
        className="w-full rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:bg-slatePastel"
      >
        Confirm booking
      </button>
    </form>
  );
}
