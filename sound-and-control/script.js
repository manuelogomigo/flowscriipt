document.addEventListener("DOMContentLoaded", function () {
    const wrappers = document.querySelectorAll('[ct-audio-element="wrapper"]');
  
    wrappers.forEach(function (wrapper) {
      const audioElement = document.createElement("audio");
      const audioURL = wrapper
        .querySelector("[ct-audio-url]")
        .getAttribute("ct-audio-url");
  
      audioElement.src = audioURL;
      wrapper.appendChild(audioElement);
  
      const playPauseButton = wrapper.querySelector('[ct-audio-trigger="click"]');
      const muteUnmuteButton = wrapper.querySelector("[ct-audio-mute]");
  
      const pauseIcon = wrapper.querySelector('[ct-audio-control="pause-icon"]');
      const playIcon = wrapper.querySelector('[ct-audio-control="play-icon"]');
      const muteIcon = wrapper.querySelector('[ct-audio-control="mute-icon"]');
      const unmuteIcon = wrapper.querySelector(
        '[ct-audio-control="unmute-icon"]'
      );
  
      const progressWrapper = wrapper.querySelector(
        '[ct-audio-progress="wrapper"]'
      );
      const progressLine = wrapper.querySelector('[ct-audio-progress="line"]');
  
      const timeTotal = wrapper.querySelector('[ct-audio-time="total"]');
      const timeCurrent = wrapper.querySelector('[ct-audio-time="current"]');
  
      const loopEnabled = playPauseButton.hasAttribute("ct-audio-loop");
  
      // Hide both pause and play icons on load
      if (pauseIcon) {
        pauseIcon.style.display = "none";
      }
      if (playIcon) {
        playIcon.style.display = "block";
      }
      if (muteIcon) {
        muteIcon.style.display = "block";
      }
      if (unmuteIcon) {
        unmuteIcon.style.display = "none";
      }
  
      // Set progress line width to 0% on load (if progress line exists)
      if (progressLine) {
        progressLine.style.width = "0%";
      }
  
      // Set initial times on load (if time elements exist)
      if (timeTotal) {
        audioElement.addEventListener("loadedmetadata", function () {
          timeTotal.textContent = formatTime(audioElement.duration);
        });
      }
      if (timeCurrent) {
        timeCurrent.textContent = "00:00";
      }
  
      playPauseButton.addEventListener("click", function () {
        if (audioElement.paused) {
          audioElement.play();
          if (pauseIcon) {
            pauseIcon.style.display = "block";
          }
          if (playIcon) {
            playIcon.style.display = "none";
          }
        } else {
          audioElement.pause();
          if (pauseIcon) {
            pauseIcon.style.display = "none";
          }
          if (playIcon) {
            playIcon.style.display = "block";
          }
        }
      });
  
      muteUnmuteButton.addEventListener("click", function () {
        if (audioElement.muted) {
          audioElement.muted = false;
          if (muteIcon) {
            muteIcon.style.display = "block";
          }
          if (unmuteIcon) {
            unmuteIcon.style.display = "none";
          }
        } else {
          audioElement.muted = true;
          if (muteIcon) {
            muteIcon.style.display = "none";
          }
          if (unmuteIcon) {
            unmuteIcon.style.display = "block";
          }
        }
      });
  
      // Update progress line width as the music progresses
      audioElement.addEventListener("timeupdate", function () {
        if (progressLine) {
          const progress =
            (audioElement.currentTime / audioElement.duration) * 100;
          progressLine.style.width = progress + "%";
        }
  
        // Update current time (if time element exists)
        if (timeCurrent) {
          timeCurrent.textContent = formatTime(audioElement.currentTime);
        }
      });
  
      // Loop the audio when it finishes (if loop is enabled)
      audioElement.addEventListener("ended", function () {
        if (loopEnabled) {
          audioElement.currentTime = 0;
          audioElement.play();
        }
      });
    });
  
    // Function to format time in mm:ss format
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  });
  