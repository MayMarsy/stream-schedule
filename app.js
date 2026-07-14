const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("#15030f");
  tg.setBackgroundColor("#070105");
}

const config = window.STREAM_CONFIG;

const schedule = config.schedule;
const sourceOffset = config.sourceOffset || "+03:00";

document.title = config.title;

const titleElement = document.querySelector("h1");

if (titleElement) {
  titleElement.textContent = config.title;
}

const userTimezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

document.getElementById("timezone").textContent =
  `Your timezone: ${userTimezone}`;

const scheduleContainer = document.getElementById("schedule");

function getLocalDateKey(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const values = {};

  parts.forEach(part => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return `${values.year}-${values.month}-${values.day}`;
}

function renderSchedule() {
  scheduleContainer.replaceChildren();

  const todayKey = getLocalDateKey(new Date(), userTimezone);
  let visibleIndex = 0;

  schedule.forEach(([date, time]) => {
    const streamDateTime = new Date(
      `${date}T${time}:00${sourceOffset}`
    );

    const streamDateKey = getLocalDateKey(
      streamDateTime,
      userTimezone
    );

    // Полностью пропускаем карточки прошедших дат.
    if (streamDateKey < todayKey) {
      return;
    }

    const dateText = new Intl.DateTimeFormat("en-US", {
      timeZone: userTimezone,
      weekday: "short",
      month: "short",
      day: "numeric"
    }).format(streamDateTime);

    const timeText = new Intl.DateTimeFormat("en-GB", {
      timeZone: userTimezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(streamDateTime);

    const icon = visibleIndex % 2 === 0 ? "🔥" : "😈";

    const card = document.createElement("article");
    card.className = "stream-card";
    card.style.animationDelay = `${visibleIndex * 70}ms`;

    card.innerHTML = `
      <div class="stream-icon" aria-hidden="true">${icon}</div>
      <div class="stream-date">${dateText}</div>
      <div class="stream-divider" aria-hidden="true">✦</div>
      <div class="stream-clock">${timeText}</div>
    `;

    scheduleContainer.appendChild(card);
    visibleIndex += 1;
  });
}

renderSchedule();

// Если Mini App останется открытым после полуночи,
// прошедшая дата исчезнет автоматически в течение минуты.
let currentDateKey = getLocalDateKey(new Date(), userTimezone);

setInterval(() => {
  const newDateKey = getLocalDateKey(new Date(), userTimezone);

  if (newDateKey !== currentDateKey) {
    currentDateKey = newDateKey;
    renderSchedule();
  }
}, 60000);

function initRevealAnimations() {
  const items = document.querySelectorAll(
    ".platform-card, .wishlist-button"
  );

  if (!items.length || !("IntersectionObserver" in window)) {
    return;
  }

  document.body.classList.add("animations-ready");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 70}ms`;
    observer.observe(item);
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initRevealAnimations
  );
} else {
  initRevealAnimations();
}
