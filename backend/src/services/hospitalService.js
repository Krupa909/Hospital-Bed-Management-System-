import { beds, bookings } from "../data/hospitalData.js";

function cloneBeds() {
  return beds.map((bed) => ({ ...bed }));
}

function buildAnalytics() {
  const availableBeds = beds.filter((bed) => bed.status === "available").length;
  const occupiedBeds = beds.filter((bed) => bed.status === "occupied").length;
  const occupancyRate = Math.round((occupiedBeds / beds.length) * 100);

  const bedsByType = ["ICU", "General", "Private"].map((type) => ({
    type,
    available: beds.filter((bed) => bed.type === type && bed.status === "available").length,
    occupied: beds.filter((bed) => bed.type === type && bed.status === "occupied").length,
  }));

  const bookingsByDate = bookings.reduce((accumulator, booking) => {
    accumulator[booking.bookingDate] = (accumulator[booking.bookingDate] || 0) + 1;
    return accumulator;
  }, {});

  const dailyBookings = Object.entries(bookingsByDate)
    .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
    .slice(-7)
    .map(([date, value]) => ({
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      value,
    }));

  const wards = Array.from(new Set(beds.map((bed) => bed.ward))).map((ward) => {
    const wardBeds = beds.filter((bed) => bed.ward === ward);
    const wardOccupied = wardBeds.filter((bed) => bed.status === "occupied").length;

    return {
      ward,
      occupancyRate: Math.round((wardOccupied / wardBeds.length) * 100),
      totalBeds: wardBeds.length,
    };
  });

  return {
    availableBeds,
    occupiedBeds,
    occupancyRate,
    bedsByType,
    dailyBookings,
    wards,
    totalBookings: bookings.length,
    lastUpdated: new Date().toISOString(),
  };
}

export function getSnapshot() {
  return {
    beds: cloneBeds(),
    analytics: buildAnalytics(),
    bookings: bookings.map((booking) => ({ ...booking })).slice(0, 5),
  };
}

export function createBooking({ bedId, bookingDate, patient }) {
  if (!bedId) {
    throw new Error("Bed selection is required.");
  }

  if (!bookingDate) {
    throw new Error("Booking date is required.");
  }

  if (!patient?.name || !patient?.age || !patient?.gender || !patient?.contact) {
    throw new Error("Complete patient information is required.");
  }

  const bed = beds.find((item) => item.id === bedId);

  if (!bed) {
    throw new Error("Selected bed does not exist.");
  }

  if (bed.status === "occupied") {
    throw new Error("This bed is already occupied.");
  }

  bed.status = "occupied";

  const booking = {
    id: `BK-${String(bookings.length + 1).padStart(3, "0")}`,
    bedId,
    bookingDate,
    patient,
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(booking);

  return {
    booking,
    beds: cloneBeds(),
    analytics: buildAnalytics(),
    bookings: bookings.map((item) => ({ ...item })).slice(0, 5),
  };
}
