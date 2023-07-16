function getCurrentTime(element) {
    const timeZone = element.getAttribute('ct-time-zone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const mode = element.getAttribute('ct-time-mode') || '12hr';
    const showSeconds = element.getAttribute('ct-time-seconds') !== 'false';
    const options = {
        timeZone,
        hour12: (mode === '12hr'),
        hour: 'numeric',
        minute: 'numeric',
        second: showSeconds ? 'numeric' : undefined, // Only include 'second' if showSeconds is true
    };

    function updateTime() {
        const currentTime = new Date().toLocaleTimeString([], options);
        element.textContent = currentTime;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

const elements = document.querySelectorAll('[ct-time-zone]');
elements.forEach((element) => getCurrentTime(element));