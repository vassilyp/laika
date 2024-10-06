import { VertexAI } from '@google-cloud/vertexai';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

let animaldata = "there are many whales here";
let climatedata = "it rains here all the time";
let place = "middle of the pacific ocean";

export async function generate_from_text_input(projectId = 'PROJECT_ID', animaldata, climatedata, place) {
  const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.5-flash-001',
  });

  const prompt = "Given this data on animals "+ animaldata + " for " + place + ", and the climate weather data:  " + 
  climatedata + ", please write a short story (3 sentences) about the climate and animal data on this place.";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  const generatedText = contentResponse.candidates[0].content.parts[0].text;
  console.log(JSON.stringify(generatedText));

  // Call the TTS API
  const ttsResponse = await fetch('http://localhost:3000/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: generatedText }),
  });

  if (!ttsResponse.ok) {
    throw new Error(`HTTP error! status: ${ttsResponse.status}`);
  }

  const audioBuffer = await ttsResponse.arrayBuffer();
  
  // Save the audio file
  const audioFilePath = path.join(process.cwd(), 'public', 'test_audio', 'example.mp3');
  await fs.writeFile(audioFilePath, Buffer.from(audioBuffer));

  console.log(`Audio file saved to: ${audioFilePath}`);

  return audioBuffer;
}

// Example Function
// generate_from_text_input("astute-strategy-406904", animaldata, climatedata, place)
//   .then(audioBuffer => {
//     // Save the audioBuffer or play it
//     console.log("Audio generated successfully. Buffer length:", audioBuffer.byteLength);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });