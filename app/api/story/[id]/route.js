import { NextResponse } from 'next/server';
import generateStory from '@/server/story.js';
import { setupGoogleCredentials } from '@/google-cloud-config.js';

// Remove the edge runtime declaration
// export const runtime = 'edge';

export async function GET(req, { params }) {
    try {
        setupGoogleCredentials();
        const lat = params.id.split(",")[0];
        const lon = params.id.split(",")[1];
        console.log(`Generating story for coordinates: ${lat}, ${lon}`);
        const story = await generateStory(lat, lon);
        console.log('Story generated:', story);
        
        if (story && story.error) {
            return NextResponse.json(story, { status: 500 });
        }
        
        return NextResponse.json(story, { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ 
            error: 'Error in API route', 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.next();
}

// ... existing code ...