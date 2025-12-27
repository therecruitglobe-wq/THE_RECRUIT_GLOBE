
import { GoogleGenAI } from '@google/genai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { prompt, imageSize, aspectRatio } = await req.json();

    if (!prompt || !imageSize || !aspectRatio) {
      return new Response(JSON.stringify({ error: 'Missing required fields: prompt, imageSize, and aspectRatio.' }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [textPart] },
      config: {
        imageConfig: {
          imageSize: imageSize,
          aspectRatio: aspectRatio,
        },
      },
    });

    let base64Image: string | null = null;
    let responseText: string | null = null;
    
    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                base64Image = part.inlineData.data;
                break; // Found the image, no need to continue
            }
            if (part.text) {
                responseText = part.text;
            }
        }
    }

    if (base64Image) {
      return new Response(JSON.stringify({ base64Image }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
       return new Response(JSON.stringify({ error: responseText || 'Image generation failed. The model did not return an image.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in image generation handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `An internal server error occurred: ${errorMessage}` }), { status: 500 });
  }
}
