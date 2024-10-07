import { VertexAI } from '@google-cloud/vertexai';
import { setupGoogleCredentials } from '../google-cloud-config.js';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { escape } from 'querystring';

export async function generate_from_text_input(project_id, animaldata, climatedata, place) {
    try {
        setupGoogleCredentials();
        
        console.log("Initializing VertexAI...");
        let vertexAI;
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            vertexAI = new VertexAI({
                project: project_id, 
                location: 'us-central1'
            });
        } else {
            console.error('Google Cloud credentials are not available');
            return 'Unable to generate story due to missing credentials';
        }

        const model = 'gemini-1.5-flash-001';

        console.log("Creating GenerativeModel...");
        const generativeModel = vertexAI.preview.getGenerativeModel({
            model: model,
        });

        // const prompt = `Generate a short story about the impact of climate change on the local ecosystem in ${place}. Use the following weather data: ${JSON.stringify(climatedata)} and animal data: ${JSON.stringify(animaldata)}. The story should be engaging and informative, highlighting the interconnectedness of climate and biodiversity.`;
        var prompt = null;
        if (animaldata.every(item => item === undefined)){
          prompt = "Given this data on the weather: " + 
          JSON.stringify(climatedata) + ", please write a happy short story (3 sentences) about a fictional character (tree, animal or person) and their experience with the climate change for this place. If there is no data on animals then give me a story about a person and relate it to the climate data. Don't tell me you need information, just make it up!";
        } else {
          prompt = "Given this data on animals "+ animaldata + " for " + place + ", and the climate weather data: " + 
          JSON.stringify(climatedata) + ", please write a happy short story (3 sentences) about a fictional character (tree, animal or person) and their experience with the climate change for this place. If there is no data on animals then give me a story about a person and relate it to the climate data. Don't tell me you need information, just make it up!";
        }

        console.log("Generating content...");
        const result = await generativeModel.generateContent(prompt);
        const response = await result.response;
        
        console.log("Raw response:", JSON.stringify(response, null, 2));

        let generatedText;
        if (response.candidates && response.candidates.length > 0) {
            generatedText = response.candidates[0].content.parts[0].text;
        } else if (typeof response.text === 'function') {
            generatedText = response.text();
        } else if (typeof response.text === 'string') {
            generatedText = response.text;
        } else {
            throw new Error('Unexpected response structure from Vertex AI');
        }

        console.log("Content generated successfully");
        return generatedText;
    } catch (error) {
        console.error("Error in generate_from_text_input:", error);
        return 'Error generating story: ' + error.message;
    }
}

// console.log(generate_from_text_input("astute-strategy-406904", animaldata, climatedata, place));

// Example Function
// generate_from_text_input("astute-strategy-406904", animaldata, climatedata, place)
//   .then(audioBuffer => {
//     // Save the audioBuffer or play it
//     console.log("Audio generated successfully. Buffer length:", audioBuffer.byteLength);
//   })
//   .catch(error => {
//     console.error("Error:", error);
