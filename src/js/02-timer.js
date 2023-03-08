
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";


const daysValueEl = document.querySelector('.value[data-days]');
const hoursValueEl = document.querySelector('.value[data-hours]');
const minutesValueEl = document.querySelector('.value[data-minutes]');
const secondsValueEl = document.querySelector('.value[data-seconds]');
const dateInput = document.querySelector('input#datetime-picker');
const buttonEl = document.querySelector(`button[data-start]`);

buttonEl.setAttribute(`disabled`, ``);

let timer;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= Date.now() || selectedDates[0] === undefined) {
          window.alert("Please choose a date in the future")
          buttonEl.setAttribute(`disabled`, ``);
      } else {
        buttonEl.removeAttribute('disabled');
        buttonEl.addEventListener('click', () => {
        buttonEl.setAttribute('disabled', '');
        timer = setInterval(() => {
          const timeLeft = selectedDates[0] - Date.now();
          if (timeLeft < 1000) {
             window.alert("Time's up!");
            clearInterval(timer);
            buttonEl.removeAttribute('disabled');
          }
          timerUpdater(timeLeft);
        }, 1000);
      });
    }
  },
};



const fp = flatpickr(dateInput, options);


function timerUpdater(time) {
  daysValueEl.textContent = String(convertMs(time).days).padStart(2, '0');
  hoursValueEl.textContent = String(convertMs(time).hours).padStart(2, '0');
  minutesValueEl.textContent = String(convertMs(time).minutes).padStart(2, '0');
  secondsValueEl.textContent = String(convertMs(time).seconds).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}