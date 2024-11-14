import "./style.css";
import "./ownGeo";
import { personalGeo } from "./ownGeo";

let url = "";
let url2 = "";
let urlEvrDay = "";

const cityInput = document.querySelector("#cityInput");
const applyCity = document.querySelector("#applyCity");
const coordinates = {};

(async () => {
  try {
    url = await personalGeo();
    console.log(`Returned URL: ${url}`);
    const geoData = await request();
    handleGeoData(geoData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();

applyCity.addEventListener("click", async event => {
  event.preventDefault();
  const inputValue = cityInput.value.trim().toLowerCase();

  url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=a1060c908bea315aba0920d1cd09a732`;
  console.log("Updated URL:", url);

  try {
    const geoData = await request();
    handleGeoData(geoData);
  } catch (error) {
    console.error("Error fetching city data:", error);
  }
});

const request = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const handleGeoData = async geoData => {
  console.log("Geo Data:", geoData);

  if (geoData.length > 0) {
    weathCoordinates(geoData);
    url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=a1060c908bea315aba0920d1cd09a732`;
    console.log("Weather URL:", url2);
    urlEvrDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=a1060c908bea315aba0920d1cd09a732`;
    console.log("EvrDayurl:", urlEvrDay);

    try {
      const weatherData = await requestWeather();
      console.log("Weather Data:", weatherData);
      weathForc(weatherData);
      const evrDayWeather = await requestEvrDayForecast();
      console.log("EvrDayWeath:", evrDayWeather);
      evrDayForecast(evrDayWeather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  } else {
    console.log("City not found");
    document.querySelector("#cityName").innerHTML = "City not found";
  }
};

const requestWeather = async () => {
  try {
    const response = await fetch(url2);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const requestEvrDayForecast = async () => {
  try {
    const response = await fetch(urlEvrDay);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return {
      ...data.city,
      name: data.city.name,
      list: data.list.slice(0, 17),
    };
  } catch (error) {
    throw new Error(error);
  }
};

const weathCoordinates = data => {
  const cityName = document.querySelector("#cityName");
  data.map(({ name, lat, lon, country }) => {
    cityName.textContent = `${name}, ${country}`;
    coordinates.lat = lat;
    coordinates.lon = lon;
  });
};

const weathForc = data => {
  const mainWeather = document.querySelector("#mainWeather");
  const weathDesc = document.querySelector("#weathDesc");
  const tempCel = document.querySelector("#temp");
  const feelsTemp = document.querySelector("#feelsTemp");
  const mainPres = document.querySelector("#pressure");
  const uniqIcon = document.querySelector("#weatherIcon");
  const timeZone = document.querySelector("#time");

  const { main, weather, timezone } = data;
  const { temp, feels_like, pressure } = main;
  const timeNow = new Date();
  const utcHours = timeNow.getUTCHours();
  const utcMinutes = timeNow.getUTCMinutes();

  const localHours = (utcHours + timezone / 3600) % 24;
  const localMinutes = utcMinutes.toString().padStart(2, "0");

  tempCel.textContent = `Temperature: ${(temp - 273.15).toFixed(1)}°C`;
  feelsTemp.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°C`;
  mainPres.textContent = `Pressure: ${pressure} hPa`;
  timeZone.textContent = `${Math.floor(localHours)
    .toString()
    .padStart(2, "0")}:${localMinutes}`;

  weather.map(({ main, description, icon }) => {
    mainWeather.textContent = main;
    weathDesc.textContent = description;
    uniqIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  });
};

const evrDayForecast = data => {
  const container = document.getElementById("data-container");

  const { list } = data;
  const sortedInfo = list.map(item => ({
    dt: item.dt,
    main: item.main,
    weather: item.weather,
  }));

  if (document.querySelector(".data-block")) {
    const elements = document.querySelectorAll(".data-block");

    elements.forEach(element => {
      element.remove();
    });
  }

  list.forEach(item => {
    const block = document.createElement("div");
    block.classList.add("data-block");

    block.innerHTML = `
    <p>
    <img
    src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
    >
    </p>
    <p>${new Date(item.dt * 1000).toLocaleString()}</p>
    <p><strong>Weather:</strong> ${item.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${(item.main.temp - 273.15).toFixed(
        1
      )}°C</p>
      <p><strong>Pressure:</strong> ${item.main.pressure} hPa</p>
    `;

    container.appendChild(block);
  });
  console.log(sortedInfo);
};
