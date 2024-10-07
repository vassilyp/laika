import generateStory from '..\\server\\story.js';

export async function GET(req, { params }) {
    const lat = params.id.split(",")[0];
    const lon = params.id.split(",")[1];
    const story = await generateStory(lat, lon);
    return new Response(JSON.stringify(story), { headers: { 'Content-Type': 'application/json' } });
}