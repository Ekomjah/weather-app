const card = document.querySelector(".myCard");
const btn = document.getElementById("get-weather-btn");
const selectedOption = document.querySelector("input");
const weatherScreen = document.getElementById("weather-screen");
import "./styles.css";
card.classList.toggle("hidden");
btn.addEventListener("click", () => {
  if (selectedOption.value !== "") {
    showWeather(selectedOption.value);
  }
});

selectedOption.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

console.log(process.env.API_KEY);

async function getWeather(city) {
  try {
    let link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
    let fetches = await fetch(link);
    if (!fetches.ok) {
      alert("City not found!");
      return;
    }
    let response = await fetches.json();
    return response;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(
      "Not able to fetch weather data. Please check the city name and your internet connection."
    );
    return { error: true };
  }
}

async function showWeather(city) {
  let func = await getWeather(city);
  if (func.error) alert("Something went wrong, please try again later");
  const weatherIcon = document.getElementById("weather-icon");
  const mainTemp = document.getElementById("main-temperature");
  const feelsLike = document.getElementById("feels-like");
  const humidityIs = document.getElementById("humidity");
  const windIs = document.getElementById("wind");
  const windGust = document.getElementById("wind-gust");
  const weatherMain = document.getElementById("weather-main");
  const location = document.getElementById("location");
  const myPressure = document.getElementById("pressure");
  const { weather, main, visibility, wind, name, cod } = func;
  const [{ description, icon }] = weather;
  const { temp, feels_like, pressure, humidity } = main;
  const { speed, deg, gust } = wind;
  let myImgSrc = icon ?? "N/A";
  weatherIcon.src = `https://openweathermap.org/img/wn/${myImgSrc}@2x.png`;
  mainTemp.innerText = `${temp ?? "N/A"}°C`;
  feelsLike.innerText = `Feels like: ${feels_like ?? "N/A"}°C`;
  humidityIs.innerText = `Humidity: ${humidity ?? "N/A"}%`;
  windIs.innerText = `Wind Speed: ${speed ?? "N/A"}m/s`;
  windGust.innerText = `Wind Gust: ${gust ?? "N/A"}m/s`;
  weatherMain.innerText = description.toUpperCase() ?? "N/A";
  location.innerText = name ?? "N/A";
  myPressure.innerText = `Atmospheric Pressure: ${pressure ?? "N/A"}hPa`;
}

const dateEl = document.querySelector(".date");
const date = new Date().toLocaleDateString();
dateEl.innerText = date;
