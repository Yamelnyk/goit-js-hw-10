import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;

  const promise = new Promise((resolve, reject) => {
    let valueRadioBtn = document.querySelector('[type="radio"]:checked').value;

    setTimeout(() => {
      if (valueRadioBtn === 'fulfilled') {
        resolve();
      }
      if (valueRadioBtn === 'rejected') {
        reject();
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green',
        position: 'topRight',
      });
    })
    .catch(value => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topRight',
      });
    });
}
