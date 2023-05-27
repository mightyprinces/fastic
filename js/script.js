const buttonUp = document.querySelector(".btn-up");
const buttonDown = document.querySelector(".btn-down");
const weekdayProgress = document.querySelector(
  ".weekday-item__progress--actual"
);
const weekdayItem = document.querySelector(".weekday-item");

let counterTop = 100;
let weekdayProgressTop = 0;
weekdayProgress.style.top = counterTop.toString() + "%";

buttonUp.addEventListener("click", () => {
  if (counterTop > 0 && counterTop <= 100) {
    counterTop -= 10;
    weekdayProgress.style.top = counterTop.toString() + "%";
    console.log("top", weekdayProgress.style.top);

    isWeekdayFastingDone(counterTop);
  }
});

buttonDown.addEventListener("click", () => {
  if (counterTop >= 0 && counterTop < 100) {
    counterTop += 10;
    weekdayProgress.style.top = counterTop.toString() + "%";
    console.log("top", weekdayProgress.style.top);

    isWeekdayFastingDone(counterTop);
  }
});

function isWeekdayFastingDone(counterTop) {
  console.log("in isWeekdayFastingDone");
  if (counterTop === 0) {
    weekdayItem.classList.add("weekday-item--done");
  } else {
    weekdayItem.classList.remove("weekday-item--done");
  }
}
