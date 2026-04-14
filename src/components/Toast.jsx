export default function Toast({ message, visible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-2xl bg-ink px-5 py-4 text-sm font-medium text-white shadow-soft transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
