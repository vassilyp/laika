export const dynamic = 'force-static'
const {VertexAI} = require('@google-cloud/vertexai');

export async function GET(res) {

  async function generate_from_text_input(projectId = 'copper-actor-328023') {
    const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});
  
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash-001',
    });
  
    const resp = await generativeModel.generateContent(generatePrompt({ temperture: "increase", weather: "more extreme", sea_level: "rise"}, "South America", "Fisherman"));
    console.log(JSON.stringify(resp.response.candidates[0].content.text));
    return resp.response.candidates[0].content.text;
  }

  // Helper function to generate a custom prompt based on climate data
  function generatePrompt(climateData, continent, subjectType) {
    const { temperature, weather, sea_level } = climateData;

    return `
      You are a creative storyteller given the following climate data for ${continent}, based on NASA's studies:

      - Temperature: ${temperature} degrees Celsius.
      - Weather: ${weather}.
      - Sea Level Rise: ${sea_level} cm.

      Write a fictional story about a ${subjectType} living in ${continent}. The story should describe how their life is impacted by rising temperatures, changing weather patterns, and sea level rise. The narrative should be engaging and reflect the scientific facts subtly, focusing on the emotional journey of the character.

      The story should be approximately 500 words long.
    `;
  }

  return new Response(generate_from_text_input());
}



