const card = document.querySelector('.myCard')
const btn = document.getElementById('get-weather-btn')
const selectedOption = document.querySelector('select')
const weatherScreen = document.getElementById('weather-screen')

card.classList.toggle('hidden')
btn.addEventListener('click', ()=>{
  if(selectedOption.value === 'paris') alert('Something went wrong, please try again later')
  if(selectedOption.value !== ''){
    showWeather(selectedOption.value)
    
  }
})

 async function getWeather(city){
   try{
   let str = 'https://weather-proxy.freecodecamp.rocks/api/city/<CITY>'.slice(0, -6) + city
   let fetches = await fetch(str)
   let response = await fetches.json()
   return response
   }
   catch(error){
     console.error(error)
   }
 }

 async function showWeather(city){
   console.log('hi')
 let func = await getWeather(city)
  if(func.error) alert('Something went wrong, please try again later')
  // console.log(func)
const weatherIcon = document.getElementById('weather-icon')
const mainTemp = document.getElementById('main-temperature')
const feelsLike = document.getElementById('feels-like')
const humidityIs = document.getElementById('humidity')
const windIs = document.getElementById('wind')
const windGust = document.getElementById('wind-gust')
const weatherMain = document.getElementById('weather-main')
const location  =document.getElementById('location')
const myPressure = document.getElementById('pressure')
 const {weather, main, visibility, wind, name} = func
 const [{description, icon}] = weather
 const {temp, feels_like, pressure, humidity} = main
 const {speed, deg, gust} = wind
 weatherIcon.src = icon ?? 'N/A'
mainTemp.innerText = `${temp ?? 'N/A'}°C`
feelsLike.innerText = `Feels like: ${feels_like ?? 'N/A'}°C`
humidityIs.innerText = `Humidity: ${humidity ?? 'N/A'}%`
windIs.innerText = `Wind Speed: ${speed ?? 'N/A'}m/s`
windGust.innerText =  `Wind Gust: ${gust ?? 'N/A'}m/s`
weatherMain.innerText =  description.toUpperCase() ?? 'N/A'
location.innerText = name ?? 'N/A'
myPressure.innerText = `Atmospheric Pressure: ${pressure ?? 'N/A'}hPa`
 }
const dateEl = document.querySelector('.date')
const date = new Date().toLocaleDateString()
dateEl.innerText = date
 
  
