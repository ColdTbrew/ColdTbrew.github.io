document.addEventListener('DOMContentLoaded', (event) => {
  function updateTime() {
      const now = new Date();
      const dateString = now.toLocaleDateString();
      const timeString = now.toLocaleTimeString();
      document.getElementById('current-time').textContent = `${dateString} ${timeString}`;
  }

  updateTime();
  setInterval(updateTime, 1000);

  const seats = document.querySelectorAll(".seat");

  seats.forEach((seat) => {
      const savedStartTime = localStorage.getItem(`seat-${seat.id}-startTime`);
      if (savedStartTime) {
          seat.dataset.startTime = savedStartTime;
          seat.classList.add("red");
          updateSeat(seat);
      }

      seat.addEventListener("click", () => {
          if (seat.dataset.startTime) {
              const userConfirmed = confirm("종료하시겠습니까?");
              if (userConfirmed) {
                  clearTimeout(seat.timeoutId);
                  seat.removeAttribute('data-startTime');
                  seat.querySelector("span").textContent = '';
                  seat.className = 'seat';
                  localStorage.removeItem(`seat-${seat.id}-startTime`);
              }
          } else {
              const startTime = Date.now();
              seat.dataset.startTime = startTime;
              localStorage.setItem(`seat-${seat.id}-startTime`, startTime);
              seat.classList.add("red");
              updateSeat(seat);
          }
      });
  });
});

function updateSeat(seat) {
  const currentTime = Date.now();
  const startTime = parseInt(seat.dataset.startTime);
  if (!startTime) return;

  const elapsedTimeInSeconds = ((currentTime - startTime) / 1000).toFixed(0);

  let elapsedTimeText;
  if (elapsedTimeInSeconds >= 3600) {
      const hours = Math.floor(elapsedTimeInSeconds / 3600);
      const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
      elapsedTimeText = `${hours}시간 ${minutes}분`;
  } else if (elapsedTimeInSeconds >= 60) {
      const minutes = Math.floor(elapsedTimeInSeconds / 60);
      const seconds = elapsedTimeInSeconds % 60;
      elapsedTimeText = `${minutes}분 ${seconds}초`;
  } else {
      elapsedTimeText = `${elapsedTimeInSeconds}초`;
  }

  seat.querySelector("span").textContent = elapsedTimeText;

  if (elapsedTimeInSeconds < 36) {
      seat.className = "seat yellow";
  } else if (elapsedTimeInSeconds < 72) {
      seat.className = "seat green";
  } else if (elapsedTimeInSeconds < 108) {
      seat.className = "seat blue";
  } else {
      seat.className = "seat red";
  }

  seat.timeoutId = setTimeout(() => updateSeat(seat), 1000);
}