import { useEffect, useMemo, useState } from "react";
import { createBooking, fetchHospitalSnapshot } from "./api/hospitalApi";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import BedCard from "./components/BedCard";
import BookingForm from "./components/BookingForm";
import FilterPanel from "./components/FilterPanel";
import Legend from "./components/Legend";
import SectionHeader from "./components/SectionHeader";
import Toast from "./components/Toast";

const initialFilters = {
  type: "All",
  priceRange: "All",
  availability: "All",
  date: "",
};

const initialFormData = {
  patientName: "",
  age: "",
  gender: "",
  contact: "",
};

function matchesPriceRange(price, range) {
  if (range === "All") return true;
  const [min, max] = range.split("-").map(Number);
  return price >= min && price <= max;
}

export default function App() {
  const [beds, setBeds] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedBedId, setSelectedBedId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [toast, setToast] = useState({ message: "", tone: "dark" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBed = beds.find((bed) => bed.id === selectedBedId) || null;
  const minPrice = beds.length ? Math.min(...beds.map((bed) => bed.price)) : 0;
  const maxPrice = beds.length ? Math.max(...beds.map((bed) => bed.price)) : 0;

  const stats = useMemo(
    () => [
      { label: "Available Beds", value: beds.filter((bed) => bed.status === "available").length, tone: "bg-[#E6F0F6]" },
      { label: "Occupied Beds", value: beds.filter((bed) => bed.status === "occupied").length, tone: "bg-[#F7E1DD]" },
      { label: "Wards Active", value: new Set(beds.map((bed) => bed.ward)).size, tone: "bg-[#FFF5DE]" },
    ],
    [beds]
  );

  const filteredBeds = useMemo(
    () =>
      beds.filter((bed) => {
        const matchesType = filters.type === "All" || bed.type === filters.type;
        const matchesAvailability =
          filters.availability === "All" || bed.status === filters.availability;
        const matchesPrice = matchesPriceRange(bed.price, filters.priceRange);

        return matchesType && matchesAvailability && matchesPrice;
      }),
    [beds, filters]
  );

  useEffect(() => {
    loadSnapshot();
    const intervalId = window.setInterval(loadSnapshot, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!toast.message) return undefined;
    const timeoutId = window.setTimeout(() => setToast({ message: "", tone: "dark" }), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  async function loadSnapshot() {
    try {
      setIsLoading(true);
      const snapshot = await fetchHospitalSnapshot();
      setBeds(snapshot.beds);
      setAnalytics(snapshot.analytics);
      setRecentBookings(snapshot.bookings || []);
    } catch (_error) {
      setToast({
        message: "Unable to connect to the backend. Start the server on port 4000.",
        tone: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleFilterChange(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  function handleSelectBed(bed) {
    setSelectedBedId((current) => (current === bed.id ? null : bed.id));
  }

  function handleFormChange(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleBookingSubmit(event) {
    event.preventDefault();

    if (!selectedBed) return;

    try {
      setIsSubmitting(true);
      const response = await createBooking({
        bedId: selectedBed.id,
        bookingDate: filters.date,
        patient: {
          name: formData.patientName,
          age: Number(formData.age),
          gender: formData.gender,
          contact: formData.contact,
        },
      });

      setBeds(response.beds);
      setAnalytics(response.analytics);
      setRecentBookings(response.bookings || []);
      setToast({
        message: `Booking confirmed for ${response.booking.patient.name} in ${response.booking.bedId}.`,
        tone: "dark",
      });
      setSelectedBedId(null);
      setFormData(initialFormData);
    } catch (error) {
      setToast({
        message: error.message || "Booking failed.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="hero-grid glass-panel animate-floatIn overflow-hidden rounded-[40px] border border-white/70 px-6 py-8 shadow-soft md:px-10 md:py-10">
          <div className="absolute right-10 top-10 hidden h-40 w-40 rounded-full bg-sky/10 blur-3xl lg:block" />
          <div className="absolute left-24 top-24 hidden h-24 w-24 rounded-full bg-accent/10 blur-2xl lg:block" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-7">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-primary/10 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-primary">
                  Intelligent Admission Console
                </span>
                <div className="space-y-5">
                  <p className="text-sm font-medium uppercase tracking-[0.32em] text-slatePastel">
                    Hospital Bed Booking System
                  </p>
                  <h1 className="headline-balance max-w-3xl font-display text-5xl leading-[0.92] text-ink md:text-7xl">
                    Reserve the right bed with clinical clarity and a more premium workflow.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-slatePastel md:text-lg">
                    A refined admissions interface for hospital teams to monitor availability, compare wards, and
                    confirm patient bookings with confidence.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <div className="rounded-full bg-navy px-4 py-2 font-medium text-white shadow-sm">
                  Real-time occupancy insights
                </div>
                <div className="rounded-full border border-primary/10 bg-white px-4 py-2 font-medium text-primary">
                  Structured patient intake
                </div>
                <div className="rounded-full border border-sky/20 bg-white px-4 py-2 font-medium text-navy">
                  Ward-level availability
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-[28px] border border-white/60 bg-white/50 blur-sm md:block" />
              <div className="relative rounded-[34px] border border-white/70 bg-white/75 p-5 shadow-soft">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Operations Snapshot</p>
                    <h2 className="mt-2 font-display text-4xl leading-none text-ink">Live Capacity</h2>
                  </div>
                  <div className="animate-drift rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slatePastel">
                    Updated
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div key={item.label} className={`soft-border rounded-[28px] ${item.tone} p-5 shadow-sm`}>
                      <p className="text-sm text-slatePastel">{item.label}</p>
                      <p className="mt-4 text-4xl font-extrabold tracking-tight text-ink">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[28px] bg-navy px-5 py-5 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-white/60">Bed Turnaround</p>
                      <p className="mt-2 font-display text-4xl leading-none">
                        {analytics ? `${analytics.occupancyRate}%` : "--"}
                      </p>
                    </div>
                    <p className="max-w-[220px] text-sm leading-6 text-white/70">
                      Monitor occupancy pressure and redirect admissions faster across wards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel space-y-6 rounded-[36px] border border-white/70 p-6 shadow-soft md:p-8">
          <SectionHeader
            eyebrow="Selection"
            title="Choose a bed the way you'd choose a seat"
            description="Use the filters to narrow the view, tap an available bed to select it, and review the legend for current bed status."
          />
          <FilterPanel filters={filters} onChange={handleFilterChange} minPrice={minPrice} maxPrice={maxPrice} />
          <Legend />

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
            <div className="soft-border rounded-[32px] bg-white/75 p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Bed Map</h3>
                  <p className="text-sm text-slatePastel">{filteredBeds.length} beds match your filters</p>
                </div>
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-slatePastel">Tap to select</span>
              </div>

              {isLoading ? (
                <div className="rounded-[28px] bg-paper p-8 text-center text-sm text-slatePastel">
                  Loading bed inventory...
                </div>
              ) : (
                <div className="bed-grid grid gap-4">
                  {filteredBeds.map((bed) => (
                    <BedCard
                      key={bed.id}
                      bed={bed}
                      isSelected={selectedBedId === bed.id}
                      onSelect={handleSelectBed}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="soft-border rounded-[32px] bg-white/75 p-4 md:p-6">
                <SectionHeader
                  eyebrow="Booking"
                  title="Patient details"
                  description="Confirm the patient information once a bed has been selected."
                />
                <div className="mt-6">
                  <BookingForm
                    selectedBed={selectedBed}
                    bookingDate={filters.date}
                    formData={formData}
                    onChange={handleFormChange}
                    onSubmit={handleBookingSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>

              <div className="soft-border rounded-[32px] bg-white/75 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">Live overview</h3>
                    <p className="text-sm text-slatePastel">
                      {analytics ? `Updated ${new Date(analytics.lastUpdated).toLocaleTimeString()}` : "Waiting for backend"}
                    </p>
                  </div>
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Live
                  </span>
                </div>

                {analytics && (
                  <div className="mt-5 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-paper p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slatePastel">Occupancy</p>
                        <p className="mt-2 text-2xl font-semibold text-primary">{analytics.occupancyRate}%</p>
                      </div>
                      <div className="rounded-2xl bg-paper p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slatePastel">Total Bookings</p>
                        <p className="mt-2 text-2xl font-semibold text-navy">{analytics.totalBookings}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-paper p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slatePastel">Ward load</p>
                      <div className="mt-3 space-y-3">
                        {analytics.wards.map((ward) => (
                          <div key={ward.ward} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-ink">{ward.ward}</span>
                              <span className="text-slatePastel">{ward.occupancyRate}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${ward.occupancyRate}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-paper p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slatePastel">Recent bookings</p>
                      <div className="mt-3 space-y-3">
                        {recentBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3">
                            <div>
                              <p className="font-medium text-ink">{booking.patient.name}</p>
                              <p className="text-sm text-slatePastel">
                                {booking.bedId} | {booking.bookingDate}
                              </p>
                            </div>
                            <span className="rounded-full bg-sky/10 px-2.5 py-1 text-xs font-semibold text-sky">
                              {booking.patient.gender}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {analytics && (
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Analytics"
              title="A simple dashboard for occupancy and demand"
              description="Pastel charts keep the analytics lightweight while still making utilization trends easy to scan."
            />
            <AnalyticsDashboard analytics={analytics} />
          </section>
        )}
      </div>

      <Toast message={toast.message} visible={Boolean(toast.message)} tone={toast.tone} />
    </div>
  );
}
