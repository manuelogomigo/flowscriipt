function getCurrentTime(element) {
            const timeZone = element.getAttribute('ct-date-timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
            const mode = element.getAttribute('ct-date-mode') || '12hr';
            const options = { timeZone, hour12: (mode === '12hr'), hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const currentTime = new Date().toLocaleTimeString([], options);
            element.textContent = currentTime;
            setInterval(() => {
                const currentTime = new Date().toLocaleTimeString([], options);
                element.textContent = currentTime;
            }, 1000);
        }

        const elements = document.querySelectorAll('[ct-date-time]');
        elements.forEach((element) => getCurrentTime(element));