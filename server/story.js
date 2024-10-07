import getCoordinateWeather from './openweather.js'
import getCoordinateAnimals from './animals.js'
import { generate_from_text_input } from './vertex.js';
import SECRET from "./secret.json" with { type: "json" };

// Given coordinates, return a story in text
async function generateStory(lat, lon) {
    if (lat == undefined || lon == undefined) {
        console.log("Forgot latitude or longitude!")
        return
    }

    const climatedata = await getCoordinateWeather(lat, lon)
    console.log(climatedata)

    const radius = 10000  // TODO: fine tune this
    const place = climatedata.name // change this 

    const animaldata = await getCoordinateAnimals(Math.round(lat), Math.round(lon), radius)
    console.log(animaldata)

    const aLittleStory = await generate_from_text_input("astute-strategy-406904", animaldata, climatedata, place)

    console.log(aLittleStory)
    return aLittleStory
}

let lat = 53.546
let lon =  -113.493
generateStory(lat, lon)
