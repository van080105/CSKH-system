export default function formatTime(time) {
  const d =
    typeof time === "string" || typeof time === "number"
      ? new Date(time)
      : time instanceof Date
      ? time
      : new Date(); // fallback tránh Invalid Date

  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
