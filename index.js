const fetch = require("node-fetch");
const dotenv = require('dotenv')
dotenv.config()


const getWeatherAndTime = async (data) => {
    const apiKey = `${process.env.OPENWEATHER_API_KEY}`
    const userName = `${process.env.GEONAMES_USERNAME}`
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${data[0]},${data[1]}&appid=${apiKey}`
    const weatherData = await fetch(weatherUrl)
    const body = await weatherData.json()

    const { coord: { lat, lon },main, weather, visibility, wind, clouds, dt } = await body
    const timeUrl = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=${userName}`
    const getTime = await fetch(timeUrl)
    const timeDetails = await getTime.json()

    const timeAndWeather = { 'currentTime': timeDetails.time, 'weather': {weather: weather[0], main, visibility,wind, clouds, dt}}
    console.log(timeAndWeather);
}

getWeatherAndTime(['Kigali', 'rw'])