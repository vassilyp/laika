import { VertexAI } from '@google-cloud/vertexai';

let animaldata = "there are many whales here";
let climatedata = "it rains here all the time";
let place = "middle of the pacific ocean";

async function generate_from_text_input(projectId = 'PROJECT_ID', animaldata, climatedata, place) {
  const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.5-flash-001',
  });

  const prompt = "Given this data on animals "+ animaldata + " for " + place + ", and the climate weather data:  " + 
  climatedata + ", please write a short story (3 sentences) about the climate and animal data on this place.";

  const resp = await generativeModel.generateContent(prompt);
  const contentResponse = await resp.response;
  console.log(JSON.stringify(contentResponse.candidates[0].content.parts[0].text));
  return contentResponse.candidates[0].content.parts[0].text;
}

generate_from_text_input("astute-strategy-406904", animaldata, climatedata, place);