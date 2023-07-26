document.addEventListener("DOMContentLoaded", function () {
    const wrappers = document.querySelectorAll('[ct-audio-element="wrapper"]');
  
    wrappers.forEach(function (wrapper) {
      const audioElement = document.createElement("audio");
      const audioURL = wrapper
        .querySelector("[ct-audio-url]")
        .getAttribute("ct-audio-url");
  
      // Check if audioURL is not empty before proceeding
      if (audioURL) {
        audioElement.src = audioURL;
        wrapper.appendChild(audioElement);
  
        const playPauseButton = wrapper.querySelector(
          '[ct-audio-trigger="click"]'
        );
        const muteUnmuteButton = wrapper.querySelector("[ct-audio-mute]");
  
        const pauseIcon = wrapper.querySelector(
          '[ct-audio-control="pause-icon"]'
        );
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
  
        // Slider volume functionality
        const volumeWrapper = wrapper.querySelector(
          '[ct-audio-volume="wrapper"]'
        );
        const volumeTrack = wrapper.querySelector('[ct-audio-volume="track"]');
        const volumeHandle = wrapper.querySelector('[ct-audio-volume="handle"]');
        const volumeValueElement = wrapper.querySelector(
          '[ct-audio-volume="value"]'
        );
  
        // Set the initial value
        let volumeValue = 100;
  
        // Function to update the slider handle position, selected range, and the displayed value
        function updateSliderPositionAndValue() {
          const containerWidth = volumeWrapper.clientWidth;
          const handleWidth = volumeHandle ? volumeHandle.clientWidth : 0;
          const newPosition =
            (volumeValue / 100) * (containerWidth - handleWidth);
          if (volumeHandle) volumeHandle.style.left = newPosition + "px";
          volumeTrack.style.width = newPosition + handleWidth / 2 + "px";
          if (volumeValueElement)
            volumeValueElement.textContent = `${volumeValue}`;
        }
  
        // Function to handle the click event on volume wrapper and update the volume
        function handleVolumeClick(event) {
          const containerRect = volumeWrapper.getBoundingClientRect();
          const containerWidth = volumeWrapper.clientWidth;
          const handleWidth = volumeHandle ? volumeHandle.clientWidth : 0;
          let newPosition = event.clientX - containerRect.left - handleWidth / 2;
          newPosition = Math.max(
            0,
            Math.min(newPosition, containerWidth - handleWidth)
          );
          volumeValue = Math.round(
            (newPosition / (containerWidth - handleWidth)) * 100
          );
          updateSliderPositionAndValue();
          // Update audio volume
          audioElement.volume = volumeValue / 100;
        }
  
        // Attach event listener to handle click on volume wrapper
        volumeWrapper.addEventListener("click", handleVolumeClick);
  
        // Function to handle the mouse move and touch move events and update the slider value accordingly
        function handleMove(event) {
          const containerRect = volumeWrapper.getBoundingClientRect();
          const containerWidth = volumeWrapper.clientWidth;
          const handleWidth = volumeHandle ? volumeHandle.clientWidth : 0;
          let newPosition;
  
          if (event.type === "mousemove") {
            newPosition = event.clientX - containerRect.left - handleWidth / 2;
          } else if (event.type === "touchmove") {
            newPosition =
              event.touches[0].clientX - containerRect.left - handleWidth / 2;
          }
  
          newPosition = Math.max(
            0,
            Math.min(newPosition, containerWidth - handleWidth)
          );
          volumeValue = Math.round(
            (newPosition / (containerWidth - handleWidth)) * 100
          );
          updateSliderPositionAndValue();
          // Update audio volume
          audioElement.volume = volumeValue / 100;
  
          // Update audio volume and handle mute
          if (volumeValue === 0) {
            audioElement.muted = true;
            if (muteIcon) {
              muteIcon.style.display = "none";
            }
            if (unmuteIcon) {
              unmuteIcon.style.display = "block";
            }
          } else {
            audioElement.muted = false;
            if (muteIcon) {
              muteIcon.style.display = "block";
            }
            if (unmuteIcon) {
              unmuteIcon.style.display = "none";
            }
          }
        }
  
        // Attach event listeners to handle slider interaction for both mouse and touch events
        if (volumeHandle) {
          volumeHandle.addEventListener("mousedown", () => {
            document.addEventListener("mousemove", handleMove);
          });
  
          document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleMove);
          });
  
          volumeHandle.addEventListener("touchstart", () => {
            document.addEventListener("touchmove", handleMove);
          });
  
          document.addEventListener("touchend", () => {
            document.removeEventListener("touchmove", handleMove);
          });
        } else {
          volumeTrack.addEventListener("mousedown", () => {
            document.addEventListener("mousemove", handleMove);
          });
  
          document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleMove);
          });
  
          volumeTrack.addEventListener("touchstart", () => {
            document.addEventListener("touchmove", handleMove);
          });
  
          document.addEventListener("touchend", () => {
            document.removeEventListener("touchmove", handleMove);
          });
        }
  
        // Attach event listener to handle click on volume wrapper for touch events
        volumeWrapper.addEventListener("touchstart", handleVolumeClick);
  
        // Call the update function once at the beginning to display the initial value
        updateSliderPositionAndValue();
      } else {
        console.error("Invalid audio URL:", audioURL);
      }
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
  