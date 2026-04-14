import { useEffect, useMemo, useState } from "react";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import BedCard from "./components/BedCard";
import BookingForm from "./components/BookingForm";
import FilterPanel from "./components/FilterPanel";
import Legend from "./components/Legend";
import SectionHeader from "./components/SectionHeader";
import Toast from "./components/Toast";
import { bedInventory, dailyBookings } from "./data/beds";

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
  const [beds, setBeds] = useState(bedInventory);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedBedId, setSelectedBedId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [toastMessage, setToastMessage] = useState("");

  const minPrice = Math.min(...beds.map((bed) => bed.price));
  const maxPrice = Math.max(...beds.map((bed) => bed.price));

  const selectedBed = beds.find((bed) => bed.id === selectedBedId) || null;

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
    if (!toastMessage) return undefined;
    const timeoutId = window.setTimeout(() => setToastMessage(""), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  function handleFilterChange(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  function handleSelectBed(bed) {
    setSelectedBedId((current) => (current === bed.id ? null : bed.id));
  }

  function handleFormChange(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleBookingSubmit(event) {
    event.preventDefault();

    if (!selectedBed) return;

    setBeds((currentBeds) =>
      currentBeds.map((bed) =>
        bed.id === selectedBed.id
          ? {
              ...bed,
              status: "occupied",
            }
          : bed
      )
    );

    setToastMessage(`Booking confirmed for ${formData.patientName} in ${selectedBed.id}.`);
    setSelectedBedId(null);
    setFormData(initialFormData);
  }

  return (
    <div className="min-h-screen px-4 py-8 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="glass-panel animate-floatIn overflow-hidden rounded-[36px] border border-white/70 px-6 py-8 shadow-soft md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slatePastel">
                Hospital Bed Booking System
              </span>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
                  Minimal bed booking with a calm dashboard and fast patient intake.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slatePastel">
                  Browse live bed availability, filter by ward preferences, and complete patient booking in a
                  seamless RedBus-inspired selection flow designed for hospital teams.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Available Beds", value: beds.filter((bed) => bed.status === "available").length, tone: "bg-mint" },
                { label: "Occupied Beds", value: beds.filter((bed) => bed.status === "occupied").length, tone: "bg-blush" },
                { label: "Wards Active", value: new Set(beds.map((bed) => bed.ward)).size, tone: "bg-lavender" },
              ].map((item) => (
                <div key={item.label} className={`rounded-[28px] ${item.tone} p-5 shadow-sm`}>
                  <p className="text-sm text-slatePastel">{item.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-ink">{item.value}</p>
                </div>
              ))}
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

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-[32px] bg-white/70 p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Bed Map</h3>
                  <p className="text-sm text-slatePastel">{filteredBeds.length} beds match your filters</p>
                </div>
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-slatePastel">
                  Tap to select
                </span>
              </div>

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
            </div>

            <div className="rounded-[32px] bg-white/70 p-4 md:p-6">
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
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeader
            eyebrow="Analytics"
            title="A simple dashboard for occupancy and demand"
            description="Pastel charts keep the analytics lightweight while still making utilization trends easy to scan."
          />
          <AnalyticsDashboard beds={beds} dailyBookings={dailyBookings} />
        </section>
      </div>

      <Toast message={toastMessage} visible={Boolean(toastMessage)} />
    </div>
  );
}
