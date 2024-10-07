import getCoordinateWeather from './openweather.js'
import getCoordinateAnimals from './animals.js'
import { generate_from_text_input } from './vertex.js';
import convertTextToSpeech from './TextToSpeech.js';

export async function generateStory(lat, lon) {
    try {
        if (lat == undefined || lon == undefined) {
            console.log("Forgot latitude or longitude!")
            return { error: 'Missing latitude or longitude' };
        }

        const climatedata = await getCoordinateWeather(lat, lon)
        console.log("Climate data:", climatedata)

        const radius = 10000  // TODO: fine tune this
        const place = climatedata.name || 'Unknown location' // Fallback if name is not provided

        const animaldata = await getCoordinateAnimals(Math.round(lat), Math.round(lon), radius)
        console.log("Animal data:", animaldata)

        const aLittleStory = await generate_from_text_input("copper-actor-328023", animaldata, climatedata, place)
        console.log("Generated story:", aLittleStory)

        if (typeof aLittleStory === 'string' && aLittleStory.startsWith('Error generating story:')) {
            throw new Error(aLittleStory);
        }

        let audioURL;
        try {
            // Convert the story to speech and get the audio URL
            audioURL = await convertTextToSpeech(aLittleStory);
        } catch (ttsError) {
            console.error("Error in text-to-speech conversion:", ttsError);
            audioURL = null; // Set to null if conversion fails
        }

        const storyData = {
            name: place,
            story: aLittleStory,
            audioURL: audioURL
        };

        return storyData;
    } catch (error) {
        console.error("Error in generateStory:", error);
        return {
            error: 'Error generating story',
            details: error.message
        };
    }
}

export default generateStory