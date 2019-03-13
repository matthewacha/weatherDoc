const fetch = require("node-fetch")
const readIo = require('console-read-write');
const dotenv = require('dotenv')
dotenv.config()


const main = async () => {
    readIo.write("Input location and postal code seperated by a space e.g. London uk ");
    const value = await readIo.read()
    const cleanData = value.split(' ')
    getWeatherAndTime(cleanData)
}

const getWeatherAndTime = async (data) => {
    let timeUrl, getTime, timeAndWeather, timeDetails;
    const apiKey = `${process.env.OPENWEATHER_API_KEY}`
    const userName = `${process.env.GEONAMES_USERNAME}`
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${data[0]},${data[1]}&appid=${apiKey}`
    const weatherData = await fetch(weatherUrl).catch(err=> console.log(err.message))
    const body = await weatherData.json()
    if(body.cod !== '404'){
        const { coord: { lat, lon },main, weather, visibility, wind, clouds, dt } = await body
        timeUrl = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=${userName}`
        getTime = await fetch(timeUrl)
        timeDetails = await getTime.json()
        timeAndWeather = {
            currentTime: timeDetails.time,
            weather: {
                weather: weather[0],
                main, visibility, wind, clouds, dt}}
        console.log(timeAndWeather)
    } else {
        console.log(body.message);
    }

}

main()
