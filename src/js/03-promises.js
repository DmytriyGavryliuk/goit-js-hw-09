import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayInput = document.querySelector('input[name=delay]');
const delayStepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const submitButton = document.querySelector(`button[type="submit"]`)


submitButton.addEventListener('click', e => {
   e.preventDefault();
 submitButton.setAttribute('disabled', '');
  let delay = Number(firstDelayInput.value);
  let step = Number(delayStepInput.value);
  let amount = Number(amountInput.value);

  for (let index = 1; index <= amount; index ++ ) {
    createPromise(index, delay)
      .then(({ index, delay }) => {
        Notify.success(`✅ Fulfilled promise ${index} in ${delay}ms`);
      })
      .catch(({ index, delay }) => {
        Notify.failure(`❌ Rejected promise ${index} in ${delay}ms`);
      })
      .then(() => {
        if (index === amount) {
          submitButton.removeAttribute('disabled');
        }
      });
    delay += step;
  }
});


function createPromise(index, delay) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ index, delay });
      } else {
        reject({ index, delay });
      }
    }, delay);
  });
  return promise;
}



createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });



 