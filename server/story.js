import getCoordinateWeather from './openweather.js'
import getCoordinateAnimals from './animals.js'
import SECRET from "./secret.json" with { type: "json" };

// Given coordinates, return a story in text
async function generateStory(lat, lon) {
    if (lat == undefined || lon == undefined) {
        console.log("Forgot latitude or longitude!")
        return
    }

    const weatherJSON = await getCoordinateWeather(lat, lon)

    const radius = 1000  // TODO: fine tune this

    const animalsJSON = await getCoordinateAnimals(Math.round(lat), Math.round(lon), radius)

    // do chat GPT stuff here
}

// let lat = 49.2827
// let lon = -123.1207
// generateStory(lat, lon)
