import "./styles.css";

const card = document.querySelector(".card");
const btn = document.getElementById("get-weather-btn");
const selectedOption = document.querySelector("input");
const loader = document.querySelector(".loader");
const img = document.querySelector("main");
let isLoading;

btn.addEventListener("click", () => {
  if (selectedOption.value !== "") {
    showWeather(selectedOption.value);
    loader.classList.remove("hidden");
    setTimeout(() => {
      card.classList.remove("hidden");
      loader.classList.add("hidden");
    }, 2500);
    isLoading = true;
  } else {
    alert("Please enter a city name");
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
  try {
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
      `https://api.unsplash.com/search/photos?page=1&query=${description}&client_id=4an1dGuJRn7cCengE1FL59IBL_zTKqb7mamFr5DoqJ4`
    );
    const gifData = await gifFetch.json();
    const randomImg = Math.floor(Math.random() * gifData.results.length);
    img.style.backgroundImage = `url(${gifData.results[randomImg].urls.regular})`;
    const uvIndex = await openUV(coord.lat, coord.lon);
    console.log(uvIndex);
    document.getElementById("uv").innerText = uvIndex;
  } catch (error) {
    console.error("Error fetching GIF:", error);
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
console.log(openUV(-0.1257, 51.5085));
const dateEl = document.querySelector(".date");
const date = new Date().toLocaleDateString();
dateEl.innerText = date;

//img
