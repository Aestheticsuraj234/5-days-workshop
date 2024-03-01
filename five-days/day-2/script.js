window.addEventListener("load",()=>{
navigator.geolocation.getCurrentPosition(async(position)=>{
  const long = position.coords.longitude;
  const lat = position.coords.latitude;

  console.log(long,lat);


  const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b46016e0demshebd5dfe2f6e766dp12814bjsn869e6d9a54bb',
		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	UpdateWetherUI(result,"K");
} catch (error) {
	console.error(error);
}





})
})






const btn = document.getElementById("searchBtn");
let isLoading = false;
btn.addEventListener("click", async () => {
  const cityName = document.getElementsByName("cityName")[0].value;

  const url = `https://open-weather13.p.rapidapi.com/city/${cityName}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b46016e0demshebd5dfe2f6e766dp12814bjsn869e6d9a54bb',
      'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
  };

  try {
    isLoading =true;
    isLoading ? btn.innerHTML="Loading..." : btn.innerHTML="Search"
    const response = await fetch(url, options);
    const result = await response.json();
    UpdateWetherUI(result,"F");
    isLoading = false;
    isLoading ? btn.innerHTML="Loading..." : btn.innerHTML="Search"



  } catch (error) {
    console.error(error);
  } finally{
    isLoading=false;
    isLoading ? btn.innerHTML="Loading..." : btn.innerHTML="Search"
  }
})

const FarhenheitToCelsius = (f) => {
  return (f - 32) * 5 / 9;
}

const kelivinToCelsius = (k) => {
  return k - 273.15;
}


const ConvertToCelsius = (value,unit) => {
  if(unit==="K")
  {
    return kelivinToCelsius(value);
  }
  else if (unit==="F")
  {
    return FarhenheitToCelsius(value);
  }
}


const UpdateWetherUI = (data,unit)=>{
  // *temperature
  const temperature = document.getElementById("temperature");
  temperature.innerHTML = ConvertToCelsius(data.main.temp , unit).toFixed(2) + "°C";

  // *feels_like

  const feels_like = document.getElementById("feelsLikeTemperature");
  feels_like.innerHTML = `Feels like: ${ConvertToCelsius(data.main.feels_like,unit).toFixed(2)} °C`


  // *minimum
  const minimum = document.getElementById("minimum");
  minimum.innerHTML = `Min: ${ConvertToCelsius(data.main.temp_min,unit).toFixed(2)}`

  // *maximum
  const maximum = document.getElementById("maximum");
  maximum.innerHTML = `Max: ${ConvertToCelsius(data.main.temp_max,unit).toFixed(2)}`


  // *Atmospheric Pressure
  const pressure = document.getElementById("pressure");
  pressure.innerHTML = `Pressure: ${data.main.pressure}`

  // *visibility
  const visibility = document.getElementById("visibility");
  visibility.innerHTML = `Visibility: ${data.visibility}`

  // *wind-speed
  const windSpeed = document.getElementById("windSpeed");
  windSpeed.innerHTML = `Wind Speed: ${data.wind.speed}`;

  // *humidity
  const humidity = document.getElementById("humidity");
  humidity.innerHTML = `Humidity: ${data.main.humidity}`
}