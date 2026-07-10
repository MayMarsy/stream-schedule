const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("#15030f");
  tg.setBackgroundColor("#070105");
}

const schedule = [
  ["2026-07-11", "01:00"],
  ["2026-07-12", "01:00"],
  ["2026-07-13", "01:00"],
  ["2026-07-15", "02:00"],
  ["2026-07-16", "01:00"],
  ["2026-07-17", "01:00"],
  ["2026-07-18", "00:00"],
  ["2026-07-19", "00:00"],
  ["2026-07-20", "00:00"],
  ["2026-07-23", "01:00"],
  ["2026-07-24", "01:00"],
  ["2026-07-25", "00:00"],
  ["2026-07-26", "01:00"],
  ["2026-07-27", "01:00"],
  ["2026-07-28", "00:00"]
];

const userTimezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

document.getElementById("timezone").textContent =
  `Your timezone: ${userTimezone}`;

const scheduleContainer = document.getElementById("schedule");

schedule.forEach(([date, time], index) => {
  const moscowDateTime = new Date(`${date}T${time}:00+03:00`);

  const dateText = new Intl.DateTimeFormat("en-US", {
    timeZone: userTimezone,
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(moscowDateTime);

  const timeText = new Intl.DateTimeFormat("en-GB", {
    timeZone: userTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(moscowDateTime);

  const icon = index % 2 === 0 ? "🔥" : "😈";

  const card = document.createElement("article");
  card.className = "stream-card";
  card.innerHTML = `
    <div class="stream-icon" aria-hidden="true">${icon}</div>
    <div class="stream-date">${dateText}</div>
    <div class="stream-divider" aria-hidden="true">✦</div>
    <div class="stream-clock">${timeText}</div>
  `;

  scheduleContainer.appendChild(card);
});
