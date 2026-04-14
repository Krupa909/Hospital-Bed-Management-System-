export const beds = [
  { id: "ICU-101", type: "ICU", price: 12000, status: "available", ward: "Critical Care", floor: 1 },
  { id: "ICU-102", type: "ICU", price: 12000, status: "occupied", ward: "Critical Care", floor: 1 },
  { id: "ICU-103", type: "ICU", price: 12500, status: "available", ward: "Critical Care", floor: 1 },
  { id: "ICU-104", type: "ICU", price: 12500, status: "occupied", ward: "Critical Care", floor: 1 },
  { id: "GEN-201", type: "General", price: 4200, status: "available", ward: "Sunrise Wing", floor: 2 },
  { id: "GEN-202", type: "General", price: 4100, status: "available", ward: "Sunrise Wing", floor: 2 },
  { id: "GEN-203", type: "General", price: 4300, status: "occupied", ward: "Sunrise Wing", floor: 2 },
  { id: "GEN-204", type: "General", price: 4500, status: "available", ward: "Sunrise Wing", floor: 2 },
  { id: "GEN-205", type: "General", price: 4600, status: "occupied", ward: "Sunrise Wing", floor: 2 },
  { id: "PRI-301", type: "Private", price: 9000, status: "available", ward: "Harmony Suites", floor: 3 },
  { id: "PRI-302", type: "Private", price: 9500, status: "available", ward: "Harmony Suites", floor: 3 },
  { id: "PRI-303", type: "Private", price: 9800, status: "occupied", ward: "Harmony Suites", floor: 3 },
  { id: "PRI-304", type: "Private", price: 9200, status: "available", ward: "Harmony Suites", floor: 3 },
  { id: "PRI-305", type: "Private", price: 9700, status: "available", ward: "Harmony Suites", floor: 3 }
];

export const bookings = [
  {
    id: "BK-001",
    bedId: "ICU-102",
    bookingDate: "2026-04-10",
    patient: { name: "Anita Rao", age: 61, gender: "Female", contact: "anita@example.com" },
    createdAt: "2026-04-10T08:40:00.000Z",
  },
  {
    id: "BK-002",
    bedId: "ICU-104",
    bookingDate: "2026-04-11",
    patient: { name: "Rahul Verma", age: 48, gender: "Male", contact: "rahul@example.com" },
    createdAt: "2026-04-11T07:20:00.000Z",
  },
  {
    id: "BK-003",
    bedId: "GEN-203",
    bookingDate: "2026-04-12",
    patient: { name: "Sara Khan", age: 35, gender: "Female", contact: "sara@example.com" },
    createdAt: "2026-04-12T10:10:00.000Z",
  },
  {
    id: "BK-004",
    bedId: "GEN-205",
    bookingDate: "2026-04-13",
    patient: { name: "Mohit Singh", age: 42, gender: "Male", contact: "mohit@example.com" },
    createdAt: "2026-04-13T11:45:00.000Z",
  },
  {
    id: "BK-005",
    bedId: "PRI-303",
    bookingDate: "2026-04-13",
    patient: { name: "Neha Kapoor", age: 52, gender: "Female", contact: "neha@example.com" },
    createdAt: "2026-04-13T14:05:00.000Z",
  }
];
