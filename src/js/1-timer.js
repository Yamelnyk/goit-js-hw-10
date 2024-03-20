import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateTimeInput = document.getElementById('datetime-picker');

let userSelectedDate;
let intervalId;

startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= options.defaultDate) {
      iziToast.show({
        title: '❌',
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });

      // window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', handelClickStart);

function handelClickStart(event) {
  dateTimeInput.setAttribute('disabled', 'disabled');
  startBtn.setAttribute('disabled', 'disabled');

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const timer = userSelectedDate - currentTime;

    let { days, hours, minutes, seconds } = convertMs(timer);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);

    if (timer < 1000) {
      clearInterval(intervalId);
      dateTimeInput.removeAttribute('disabled');
    }
  }, 1000);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
