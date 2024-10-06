import { NextResponse } from 'next/server';
import { ElevenLabsClient } from "elevenlabs";

export async function POST(req) {
  try {
    const { text } = await req.json();

    const client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });

    // Use the correct method to generate speech
    const audioStream = await client.generate({
      voice: '21m00Tcm4TlvDq8ikWAM',
      text: text,
      model_id: 'eleven_monolingual_v1',
    });

    // Convert the audio stream to a buffer
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json({ error: 'Error generating speech' }, { status: 500 });
  }

}
