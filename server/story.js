import getCoordinateWeather from './openweather.js'
import getCoordinateAnimals from './animals.js'
import { generate_from_text_input } from './vertex.js';
import convertTextToSpeech from './TextToSpeech.js'; // Updated to match the correct casing

// Given coordinates, return a story in text
export async function generateStory(lat, lon) {
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

    const aLittleStory = await generate_from_text_input("copper-actor-328023", animaldata, climatedata, place)

    console.log(aLittleStory)

    // Convert the story to speech and get the audio URL
    const audioURL = await convertTextToSpeech(aLittleStory);

    const storyData = {
        name: place,
        story: aLittleStory,
        audioURL: audioURL
    };

    return storyData;
}

export default generateStory
