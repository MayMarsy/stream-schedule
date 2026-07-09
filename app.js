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


const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


document.getElementById("timezone").innerHTML =
    "🌍 Your timezone: " + userTimezone;


const container = document.getElementById("schedule");


schedule.forEach(stream => {

    const date = stream[0];
    const time = stream[1];


    // Moscow time UTC+3
    const moscowTime = new Date(
        `${date}T${time}:00+03:00`
    );


    const localTime = moscowTime.toLocaleString(
        "en-US",
        {
            timeZone: userTimezone,
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
    );


    container.innerHTML += `
        <div class="day">
            <div class="date">
                🎮 Stream
            </div>
            <div class="time">
                ${localTime}
            </div>
        </div>
    `;

});
