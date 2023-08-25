function getCurrentDateTime(element) {
  const timeZone =
    element.getAttribute("ct-time-date") ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateOptions = {
    timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function updateDateTime() {
    const currentDate = new Date().toLocaleDateString([], dateOptions);

    element.textContent = currentDate;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
}

const timeElements = document.querySelectorAll("[ct-time-date]");
timeElements.forEach((element) => getCurrentDateTime(element));

function getCurrentTime(element) {
  const timeZone =
    element.getAttribute("ct-time-zone") ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  const mode = element.getAttribute("ct-time-mode") || "12hr";
  const showSeconds = element.getAttribute("ct-time-seconds") !== "false";
  const options = {
    timeZone,
    hour12: mode === "12hr",
    hour: "numeric",
    minute: "numeric",
    second: showSeconds ? "numeric" : undefined, // Only include 'second' if showSeconds is true
  };

  function updateTime() {
    const currentTime = new Date().toLocaleTimeString([], options);
    element.textContent = currentTime;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

const zoneElements = document.querySelectorAll("[ct-time-zone]");
zoneElements.forEach((element) => getCurrentTime(element));
