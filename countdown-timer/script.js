document.addEventListener('DOMContentLoaded', function() {
    const countdownWrappers = document.querySelectorAll('[ct-countdown-wrapper]');

    countdownWrappers.forEach(function(countdownWrapper) {
      const countdownDay = countdownWrapper.querySelector('[ct-countdown-day]');
      const countdownHour = countdownWrapper.querySelector('[ct-countdown-hour]');
      const countdownMinutes = countdownWrapper.querySelector('[ct-countdown-minutes]');
      const countdownSeconds = countdownWrapper.querySelector('[ct-countdown-seconds]');
      const countdownDate = countdownWrapper.getAttribute('ct-countdown-date');
      const countdownTime = countdownWrapper.getAttribute('ct-countdown-time') || '12:00am';

      const [time, period] = countdownTime.toLowerCase().split(/(?=[ap]m)/);
      const [hours, minutes] = time.replace(/[^0-9:]/gi, '').split(':');

      let hours24 = Number(hours);
      if (period === 'pm' && hours24 < 12) {
        hours24 += 12;
      } else if (period === 'am' && hours24 === 12) {
        hours24 = 0;
      }

      const formattedCountdownTime = `${hours24.toString().padStart(2, '0')}:${minutes}`;

      const [day, month, year] = countdownDate.split('-');
      const formattedCountdownDate = `${month}-${day}-${year}`;

      const countdownTimestamp = new Date(`${formattedCountdownDate} ${formattedCountdownTime}`).getTime();

      setInterval(updateCountdown, 1000);

      function updateCountdown() {
        const now = new Date().getTime();
        const remainingTime = countdownTimestamp - now;

        let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        if (days < 0) days = 0;
        if (hours < 0) hours = 0;
        if (minutes < 0) minutes = 0;
        if (seconds < 0) seconds = 0;

        countdownDay.textContent = days;
        countdownHour.textContent = hours;
        countdownMinutes.textContent = minutes;
        countdownSeconds.textContent = seconds;
      }
    });
  });