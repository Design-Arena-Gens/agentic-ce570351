import { NextRequest, NextResponse } from 'next/server';

const HORROR_SOUND_EFFECTS = [
  'creaking door',
  'thunder crash',
  'distant scream',
  'heartbeat',
  'whisper',
  'footsteps',
  'eerie music',
  'wind howling'
];

// Generate horror story using Claude AI (simulated)
async function generateHorrorStory(prompt: string): Promise<string> {
  // In a real implementation, you would call an AI API like Claude or GPT
  // For this demo, we'll generate a structured horror story

  const stories = [
    `The old mansion at the end of Blackwood Lane had been abandoned for decades. Nobody dared to enter... until tonight.

As I pushed open the heavy oak door, it groaned like a wounded animal. The air inside was thick with decay and something else... something watching.

My flashlight flickered across dusty furniture and peeling wallpaper. Then I heard it - footsteps above me, slow and deliberate. But this house was supposed to be empty.

I climbed the creaking stairs, each step echoing through the darkness. At the top, a door stood ajar, revealing a child's bedroom frozen in time. A music box sat on the dresser, its lid slowly opening by itself.

The tinkling melody filled the air, and in the mirror, I saw them - dozens of pale faces staring back at me. But when I turned around, the room was empty.

The door slammed shut behind me. The music stopped. In the sudden silence, I heard a whisper: "You shouldn't have come here."`,

    `The camera in my bedroom was supposed to make me feel safe. But when I reviewed the footage the next morning, I wished I'd never looked.

At 3:13 AM, the bedroom door opened. Nobody entered. But something did.

The temperature dropped so fast, my breath became visible on the recording. Then the shadows started moving independently from their sources.

I watched myself sleeping peacefully while around me, the darkness gathered and took shape. Tall, impossibly thin figures stood at each corner of my bed, watching.

One leaned down close to my sleeping face. So close I should have felt its breath. But I slept through it all, completely unaware.

The timestamp showed they stood there for exactly 47 minutes. Just watching. Waiting.

When the clock hit 4:00 AM, they dissolved back into the shadows. But as the last one faded, it turned to look directly at the camera. And smiled.

Tonight, I'm awake at 3:13 AM. The door just opened. The camera isn't recording this time.`,

    `I found the old radio at an estate sale. The owner's family said she'd died listening to it, found with headphones still on and a look of pure terror frozen on her face.

At home, I turned it on. Static. I spun through the stations - more static. Until I found a clear signal on a frequency that shouldn't exist.

A man's voice, deep and cold: "Thank you for listening. You're our only audience tonight." Then music began - a melody that shouldn't exist, notes that made my teeth ache and my vision blur.

I reached to turn it off, but my hands wouldn't obey. The voice returned: "You can't leave yet. The broadcast isn't finished."

The music grew louder, burrowing into my mind. Images flashed - places I'd never been, people I'd never met, all screaming silently.

Hours passed like minutes. When the broadcast finally ended, the voice whispered: "Same time tomorrow. We'll be waiting."

Now every night at midnight, the radio turns on by itself. I've tried destroying it, throwing it away, burying it. It always comes back.

The audience is growing. Last night, I heard my own voice join the chorus.`
  ];

  // Select a story based on the prompt (in real implementation, this would be AI-generated)
  const story = stories[Math.floor(Math.random() * stories.length)];
  return story;
}

// Generate speech using text-to-speech
async function generateSpeech(text: string): Promise<string> {
  // Using Web Speech API synthesis (browser-based)
  // In a production app, you'd use a service like ElevenLabs, Google TTS, or OpenAI TTS

  // For this demo, we'll return a simulated audio data URL
  // In reality, you would make an API call to a TTS service
  const audioData = Buffer.from(text).toString('base64');
  return `data:audio/mp3;base64,${audioData}`;
}

// Create video with text animations and effects
async function createHorrorVideo(story: string, audioUrl: string): Promise<string> {
  // In a real implementation, you would:
  // 1. Use ffmpeg or a video generation API
  // 2. Create animated text overlays
  // 3. Add horror effects and transitions
  // 4. Mix in atmospheric sound effects
  // 5. Synchronize with the audio narration

  // For this demo, we'll create a simple data URL
  // In production, you'd generate an actual video file
  const videoData = Buffer.from(story).toString('base64');
  return `data:video/mp4;base64,${videoData}`;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      );
    }

    // Generate horror story
    const story = await generateHorrorStory(prompt);

    // Generate deep voice narration
    const audioUrl = await generateSpeech(story);

    // Create video with animations and effects
    const videoUrl = await createHorrorVideo(story, audioUrl);

    return NextResponse.json({
      story,
      audioUrl,
      videoUrl,
      soundEffects: HORROR_SOUND_EFFECTS.slice(0, 3)
    });

  } catch (error: any) {
    console.error('Error generating horror video:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate horror video' },
      { status: 500 }
    );
  }
}
