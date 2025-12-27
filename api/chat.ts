
import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';

// Vercel's edge runtime is great for streaming.
export const config = {
  runtime: 'edge',
};

// The main function that handles incoming requests.
export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid message format' }), { status: 400 });
    }

    // Initialize the AI client securely on the server
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // Reconstruct chat history for context
    const chat: Chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are a friendly and professional recruitment consultant for "The Recruit Globe". Your goal is to assist users, whether they are job seekers or employers. You can use Google Search to find up-to-date information on companies, job trends, and interview tips. Be helpful, concise, and guide them to relevant sections of the website if necessary (like #jobs for job seekers or #contact for employers). When you use search, always cite your sources.',
        tools: [{ googleSearch: {} }],
      },
      // Assuming the last message is the user's new prompt, the rest is history
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role,
        parts: msg.text,
      })),
    });

    const userMessage = messages[messages.length - 1].text;
    const stream = await chat.sendMessageStream({ message: userMessage });

    // Create a ReadableStream to send the response back to the client
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of stream) {
            const c = chunk as GenerateContentResponse;
            const payload = {
                text: c.text,
                sources: c.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => chunk.web)
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in chat handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: `An internal server error occurred: ${errorMessage}` }), { status: 500 });
  }
}
