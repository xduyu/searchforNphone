// script.js
const apiKey = 'ВСТАВЬТЕ СВОЙ API-KEY';
const apiUrl = 'https://api.truecaller.com/v1/search';

const phoneNumberInput = document.getElementById('phone-number');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', async () => {
  const phoneNumber = phoneNumberInput.value;
  if (!phoneNumber) return;

  try {
    const response = await fetch(`${apiUrl}?phone=${phoneNumber}&apikey=${apiKey}`);
    const data = await response.json();

    const resultsHtml = `
      <h2>Результаты поиска</h2>
      <ul>
        <li>Имя: ${data.name}</li>
        <li>Адрес: ${data.address}</li>
        <li>Город: ${data.city}</li>
        <li>Страна: ${data.country}</li>
      </ul>
    `;
    resultsDiv.innerHTML = resultsHtml;
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = 'Ошибка поиска';
  }
});