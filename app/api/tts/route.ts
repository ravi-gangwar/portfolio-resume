import { NextRequest, NextResponse } from 'next/server';
import { KokoroTTS } from 'kokoro-js';

let ttsInstance: KokoroTTS | null = null;

async function initializeTTS() {
  if (!ttsInstance) {
    try {
      const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";
      ttsInstance = await KokoroTTS.from_pretrained(model_id, {
        dtype: "q8", // or "fp32" for higher quality
        device: "cpu", // Use "cpu" for Node.js server
      });
      console.log("Kokoro TTS initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Kokoro TTS:", error);
      throw error;
    }
  }
  return ttsInstance;
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    console.log("Generating speech for text:", text);

    const tts = await initializeTTS();
    
    // Generate speech with Nicole voice
    const audio = await tts.generate(text, {
      voice: "af_nicole", // Use the correct voice ID
    });

    // Get audio as WAV Uint8Array and convert to Buffer
    const wav = await audio.toWav();
    const buffer = Buffer.from(wav);

    console.log("Audio generated successfully, size:", buffer.length);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('TTS Server Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
} 