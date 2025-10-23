import "./styles.css";
import { Notyf } from "notyf";

const card = document.querySelector(".card");
const btn = document.getElementById("get-weather-btn");
const selectedOption = document.querySelector("input");
const loader = document.querySelector(".loader");
const img = document.querySelector("main");
let isLoading;
let alert = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
      },
    },
    {
      type: "error",
      background: "red",
      duration: 3000,
    },
  ],
});
btn.addEventListener("click", async () => {
  if (selectedOption.value.trim() !== "") {
    loader.classList.remove("hidden");
    card.classList.add("hidden");
    const values = await showWeather(selectedOption.value);
    while (isLoading) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log(values);
    if (values === null) {
      loader.classList.add("hidden");
      card.classList.add("hidden");
      console.log("values is invalid");
      return;
    } else {
      card.classList.remove("hidden");
      loader.classList.add("hidden");
      return;
    }
  } else {
    alert.error("Please enter a city name");
    return;
  }
});

selectedOption.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

async function getWeather(city) {
  try {
    let link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
    let fetches = await fetch(link);
    if (!fetches.ok) {
      alert.error("City not found!");
      return null;
    }
    let response = await fetches.json();
    return response;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert.error(
      "Not able to fetch weather data. Please check the city name and your internet connection."
    );
    return { error: true };
  }
}

async function showWeather(city) {
  try {
    isLoading = true;
    let func = await getWeather(city);
    if (func.error || func === null) {
      alert.error("Something went wrong, please try again later");
      return null;
    }
    const weatherIcon = document.getElementById("weather-icon");
    const mainTemp = document.getElementById("main-temperature");
    const feelsLike = document.getElementById("feels-like");
    const humidityIs = document.getElementById("humidity");
    const windIs = document.getElementById("wind");
    const windGust = document.getElementById("wind-gust");
    const weatherMain = document.getElementById("weather-main");
    const location = document.getElementById("location");
    const myPressure = document.getElementById("pressure");
    const { coord, weather, main, visibility, wind, name, cod } = func;
    console.log("hi");
    console.log(name);
    const [{ description, icon }] = weather;
    const { temp, feels_like, pressure, humidity } = main;
    const { speed, deg, gust } = wind;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    mainTemp.innerText = `${temp ?? "--"}°C`;
    feelsLike.innerText = `${feels_like ?? "--"}°C`;
    humidityIs.innerText = `${humidity ?? "--"}%`;
    windIs.innerText = `${speed ?? "--"}m/s`;
    windGust.innerText = `${gust ?? "--"}m/s`;
    weatherMain.innerText = description.toUpperCase() ?? "--";
    location.innerText = `Location: ${name}`;
    myPressure.innerText = `${pressure ?? "--"}hPa`;
    console.log(description);
    const gifFetch = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${description}&client_id=${process.env.UNSPLASH_KEY}`
    );
    const gifData = await gifFetch.json();
    const randomImg = Math.floor(Math.random() * gifData.results.length);
    img.style.backgroundImage = `url(${gifData.results[randomImg].urls.regular})`;
    const uvIndex = await openUV(coord.lat, coord.lon);
    console.log(uvIndex);
    document.getElementById("uv").innerText = uvIndex;
    return { func, gifData };
  } catch (error) {
    console.error("Error: ", error);
    alert.error("You have used all your tokens for today. Come back tomorrow");
    return null;
  } finally {
    isLoading = false;
  }
}

async function openUV(lat, lon) {
  const data = await fetch(
    `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
    {
      method: "GET",
      headers: {
        "x-access-token": process.env.UV_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  const uvData = await data.json();
  console.log(uvData.results);
  return uvData.result.uv;
}

const dateEl = document.querySelector(".date");
const date = new Date().toLocaleDateString();
dateEl.innerText = date;
