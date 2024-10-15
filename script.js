// script.js
const apiKey = 'num_live_yXwoyXZi55NgTG6PraJwlVHEEe4Gv8hYXkurIPFe';
const apiUrl = 'https://api.numlookupapi.com/v1/phone';

const phoneNumberInput = document.getElementById('phone-number');
const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const clearButton = document.getElementById('clear-button');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const phoneNumber = phoneNumberInput.value.trim();
  if (!validatePhoneNumber(phoneNumber)) {
    alert('Введите корректный номер телефона.');
    return;
  }

  loadingDiv.style.display = 'block';
  resultsDiv.innerHTML = '';

  try {
    const response = await fetch(`${apiUrl}/${phoneNumber}?apikey=${apiKey}`);  
    if (!response.ok) throw new Error('Ошибка при получении данных');
    const data = await response.json();

    displayResults(data);
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = 'Ошибка поиска: ' + error.message;
  } finally {
    loadingDiv.style.display = 'none';
  }
});

clearButton.addEventListener('click', () => {
  phoneNumberInput.value = '';
  resultsDiv.innerHTML = '';
});

function validatePhoneNumber(phoneNumber) {
  const phonePattern = /^\+?[0-9]{10,15}$/; // Пример простого паттерна для номера
  return phonePattern.test(phoneNumber);
}

function displayResults(data) {
  const resultsHtml = `
    <h2>Результ ата поиска</h2>
    <ul>
      <li>Имя: ${data.name}</li>
      <li>Адрес: ${data.address}</li>
      <li>Город: ${data.city}</li>
      <li>Страна: ${data.country}</li>
    </ul>
  `;
  resultsDiv.innerHTML = resultsHtml;
}
