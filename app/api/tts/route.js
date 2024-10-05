import { NextResponse } from 'next/server';
import { Voice, VoiceSettings } from 'elevenlabs';

export async function POST(request) {
  const { text, voiceId } = await request.json();

  try {
    const voice = new Voice({
      voice_id: voiceId,
      api_key: process.env.ELEVENLABS_API_KEY,
    });

    const voiceSettings = new VoiceSettings({
      stability: 0.5,
      similarity_boost: 0.75,
    });

    const audioStream = await voice.generateStream(text, voiceSettings);

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
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
  }
}