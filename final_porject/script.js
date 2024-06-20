document.addEventListener("DOMContentLoaded", (event) => {
  // 현재 시간 업데이트 함수
  function updateTime() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    document.getElementById(
      "current-time"
    ).textContent = `${dateString} ${timeString}`;
  }
  // 통계 초기화 버튼 이벤트 핸들러
  const resetButton = document.getElementById("reset-stats");
  resetButton.addEventListener("click", () => {
    const userConfirmed = confirm("정말로 통계를 초기화하시겠습니까?");
    if (userConfirmed) {
      localStorage.removeItem("seatUsage");
      seatUsage = {};
      statsContainer.innerHTML = "";

      // 모든 좌석 상태 초기화
      seats.forEach((seat) => {
        clearTimeout(seat.timeoutId); // 타이머 초기화
        delete seat.dataset.startTime; // 시작 시간 데이터 삭제
        localStorage.removeItem(`seat-${seat.id}-startTime`); // 로컬 스토리지에서 시작 시간 삭제

        seat.classList.remove("red", "green", "yellow", "blue", "pink"); // 모든 색상 클래스 제거
        seat.classList.add("seat"); // 기본 seat 클래스 추가

        const seatNumberSpan = seat.querySelector("span");
        seatNumberSpan.textContent = seat.id.slice(-2); // 좌석 번호만 표시
      });

      statsContainer.classList.remove("visible");
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  });

  // 처음 시간 업데이트 호출 및 1초마다 갱신
  updateTime();
  setInterval(updateTime, 1000);

  // 좌석 요소와 좌석 사용 시간 데이터 초기화
  const seats = document.querySelectorAll(".seat");
  const seatUsage = JSON.parse(localStorage.getItem("seatUsage")) || {};

  // 각 좌석에 대한 클릭 이벤트 및 상태 초기화
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
          const startTime = parseInt(seat.dataset.startTime);
          const totalUsage = (Date.now() - startTime) / 1000;
          localStorage.removeItem(`seat-${seat.id}-startTime`);
          seat.classList.remove("red", "green", "yellow", "blue", "pink");
          delete seat.dataset.startTime;

          if (!seatUsage[seat.id]) {
            seatUsage[seat.id] = 0;
          }
          seatUsage[seat.id] += totalUsage;
          localStorage.setItem("seatUsage", JSON.stringify(seatUsage));

          updateSeat(seat); // 좌석 사용 종료 후 즉시 updateSeat 호출
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
  // 건의하기 버튼 이벤트 핸들러
  const suggestionButton = document.getElementById("suggestion-button");
  const suggestionBox = document.getElementById("suggestion-box");
  const suggestionInput = document.getElementById("suggestion-input");
  const suggestionList = document.getElementById("suggestion-list");

  // 로컬 스토리지에서 댓글 불러오기
  let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
  displaySuggestions(); // 페이지 로드 시 댓글 표시

  // 건의하기 버튼 클릭 이벤트 핸들러
  suggestionButton.addEventListener("click", () => {
    suggestionBox.style.display = suggestionBox.style.display === "none" ? "block" : "none";
  });

  // 건의 내용 제출 이벤트 핸들러
  const submitSuggestionButton = document.getElementById("submit-suggestion"); // 제출 버튼 요소 선택
  submitSuggestionButton.addEventListener("click", () => {
    const suggestionText = suggestionInput.value.trim();
    if (suggestionText) {
      suggestions.push(suggestionText);
      localStorage.setItem("suggestions", JSON.stringify(suggestions));
      displaySuggestions();
      suggestionInput.value = "";
    }
  });

  // 댓글 표시 함수
  function displaySuggestions() {
    suggestionList.innerHTML = "";
    suggestions.forEach((suggestion, index) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.innerHTML = `
        <span>${suggestion}</span>
        <button class="delete-button" data-index="${index}">X</button>
      `;
      suggestionList.appendChild(suggestionItem);
    });

    // 삭제 버튼 이벤트 추가
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.dataset.index);
        deleteSuggestion(index);
      });
    });
  }

  // 댓글 삭제 함수
  function deleteSuggestion(index) {
    suggestions.splice(index, 1);
    localStorage.setItem("suggestions", JSON.stringify(suggestions));
    displaySuggestions();
  }

  // 좌석 상태 업데이트 함수
  function updateSeat(seat) {
    const seatNumberSpan = seat.querySelector("span");
    const seatNumber = seat.id.match(/\d+/)[0];

    const startTime = parseInt(seat.dataset.startTime);
    if (!startTime) {
      // 좌석 사용이 종료된 경우: 좌석 번호만 표시
      seatNumberSpan.textContent = seatNumber;
      return;
    }

    const currentTime = Date.now();
    const elapsedTimeInSeconds = ((currentTime - startTime) / 1000).toFixed(0);

    // 경과 시간 텍스트 생성
    const elapsedTimeText =
      elapsedTimeInSeconds >= 3600
        ? `${Math.floor(elapsedTimeInSeconds / 3600)}시간 ${Math.floor(
            (elapsedTimeInSeconds % 3600) / 60
          )}분`
        : elapsedTimeInSeconds >= 60
        ? `${Math.floor(elapsedTimeInSeconds / 60)}분 ${
            elapsedTimeInSeconds % 60
          }초`
        : `${elapsedTimeInSeconds}초`;

    // 좌석 번호와 경과 시간 표시
    seatNumberSpan.textContent = `${elapsedTimeText}`;

    // 좌석 색상 변경 (경과 시간에 따라)
    seat.className =
      "seat " +
      (elapsedTimeInSeconds < 60*60
        ? "yellow"
        : elapsedTimeInSeconds < 120*60
        ? "green"
        : elapsedTimeInSeconds < 180*60
        ? "blue"
        : "red");

    // 다음 업데이트 예약
    seat.timeoutId = setTimeout(() => updateSeat(seat), 1000);
  }

  // 통계 보기 버튼 이벤트 핸들러
  const toggleButton = document.getElementById("toggle-stats");
  const statsContainer = document.getElementById("stats-container");
  toggleButton.addEventListener("click", () => {
    statsContainer.classList.toggle("visible");

    if (statsContainer.classList.contains("visible")) {
      statsContainer.innerHTML = "";

      for (const seatId in seatUsage) {
        const seat = document.getElementById(seatId);
        const totalUsage = seatUsage[seatId] || 0;

        // 시간, 분, 초 계산
        const hours = Math.floor(totalUsage / 3600);
        const minutes = Math.floor((totalUsage % 3600) / 60);
        const seconds = Math.floor(totalUsage % 60);

        const usageText = `${hours}시간 ${minutes}분 ${seconds}초`;

        const seatStats = document.createElement("div");
        seatStats.textContent = `${seat.id}: ${usageText}`;
        seatStats.classList.add("seat-stats");

        if (totalUsage > 3 * 60 * 60) {
          seatStats.classList.add("pink");
        } else if (totalUsage > 2 * 60 * 60) {
          seatStats.classList.add("blue");
        } else if (totalUsage > 1 * 60 * 60) {
          seatStats.classList.add("green");
        } else {
          seatStats.classList.add("yellow");
        }

        statsContainer.appendChild(seatStats);
      }
    }
  });
});
