const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  p1.textContent = '';
  p2.textContent = '';
  p3.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p1.textContent = data.error;
        p2.textContent = '';
        p3.textContent = '';
      } else {
        p1.textContent = data.address;
        p2.textContent = data.location;
        p3.textContent = data.forecast;
      }
    });
  });
});
