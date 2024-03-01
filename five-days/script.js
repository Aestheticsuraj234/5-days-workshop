window.addEventListener("load", async (e) => {
  e.stopPropagation();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '300499526dmshc44a845ccf0661bp1597d4jsn4c37baefe350',
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        updateWeatherUI(result, "K");
      } catch (error) {
        console.error(error);
      }
    });
  }
});

function convertTemperature(temperature, unit) {
  if (unit === "K") {
    return convertKelvinToCelsius(temperature);
  } else if (unit === "F") {
    return convertFahrenheitToCelsius(temperature);
  } else {
    throw new Error("Invalid temperature unit");
  }
}

function convertKelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function convertFahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function updateWeatherUI(data, unit) {
  const temperature = document.getElementById('temperature');
  const tempCelsius = convertTemperature(data.main.temp, unit);
  temperature.innerHTML = `${tempCelsius.toFixed(2)}°C`;

  // update other elements similarly, using convertTemperature for each value based on its unit
  const feelsLike = document.getElementById("feelsLikeTemperature");
  feelsLike.innerHTML = `Feels Like: ${convertTemperature(data.main.feels_like, unit).toFixed(2)}°C`;

  // min temperature
  const minTemperature = document.getElementById("minimum");
  const minTempCelsius = convertTemperature(data.main.temp_min, unit).toFixed(2);
  minTemperature.innerHTML = `${minTempCelsius}°C`;

  // max temperature
  const maxTemperature = document.getElementById("maximum");
  const maxTempCelsius = convertTemperature(data.main.temp_max, unit).toFixed(2);
  maxTemperature.innerHTML = `${maxTempCelsius}°C`;

  // pressure
  const atmosphericPressure = document.getElementById("pressure");
  atmosphericPressure.innerHTML = `${data.main.pressure} hPa`;

  // visibility
  const visibility = document.getElementById("visibility");
  visibility.innerHTML = `${data.visibility} meters`;

  // wind speed
  const windSpeed = document.getElementById("windSpeed");
  windSpeed.innerHTML = `${data.wind.speed} m/s`;

  // humidity
  const humidity = document.getElementById("humidity");
  humidity.innerHTML = `${data.main.humidity}%`;

}

const btn = document.getElementById("searchBtn");
let isLoading = false;
btn.addEventListener("click", async () => {
  const cityName = document.getElementsByName("cityName")[0].value;
  const url = `https://open-weather13.p.rapidapi.com/city/${cityName}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '300499526dmshc44a845ccf0661bp1597d4jsn4c37baefe350',
      'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
  };
  try {
    isLoading = true;
    isLoading ? btn.innerHTML = "Loading..." : btn.innerHTML = "Search";
    const response = await fetch(url, options);
    const result = await response.json();
    updateWeatherUI(result, "F");
  } catch (error) {
    isLoading = false;
    console.error(error);
  } finally {
    isLoading = false;
    isLoading ? btn.innerHTML = "Loading..." : btn.innerHTML = "Search";
  }
});
