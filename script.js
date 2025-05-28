const apiKey = "696ed8dff3c99ff779625d991eb176ea"; // API-Key

const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") fetchWeather();
});

function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  weatherResult.innerHTML = "Loading...";

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather, wind } = data;
      weatherResult.innerHTML = `
        <div class="weather-card">
          <h4>${name}</h4>
          <p><strong>${weather[0].main}</strong> – ${weather[0].description}</p>
          <p>🌡 Temp: ${main.temp}°C</p>
          <p>💨 Wind: ${wind.speed} m/s</p>
          <p>💧 Humidity: ${main.humidity}%</p>
        </div>
      `;
    })
    .catch(error => {
      weatherResult.innerHTML = `<div class="text-danger">❌ ${error.message}</div>`;
    });
}
