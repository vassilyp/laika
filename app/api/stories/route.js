export const dynamic = 'force-static'
const {VertexAI} = require('@google-cloud/vertexai');

export async function GET(res) {

  async function generate_from_text_input(projectId = 'copper-actor-328023') {
    const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});
  
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash-001',
    });
  
    const prompt =
      "What's a good name for a flower shop that specializes in selling bouquets of dried flowers?";
  
    const resp = await generativeModel.generateContent(prompt);
    console.log(resp.response.candidates[0].content);
    return ;
  }

  return new Response(generate_from_text_input());
}



