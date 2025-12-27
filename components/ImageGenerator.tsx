
import React, { useState, useEffect } from 'react';
import PhotoIcon from './icons/PhotoIcon';
import SparklesIcon from './icons/SparklesIcon';

const loadingMessages = [
    "Sketching with digital oil paints...",
    "Consulting the muse of machinery...",
    "Rendering industrial landscapes...",
    "Polishing chrome and steel...",
    "This can take a moment, great art requires patience!",
    "Finalizing the masterpiece...",
];

type ImageSize = '1K' | '2K' | '4K';
type AspectRatio = '16:9' | '1:1' | '9:16';

const ImageGenerator: React.FC = () => {
    const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
    const [prompt, setPrompt] = useState<string>('A photorealistic image of a modern offshore oil rig at sunset, with calm seas and a dramatic, colorful sky. High detail, 8K resolution.');
    const [imageSize, setImageSize] = useState<ImageSize>('1K');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio) {
                const keyStatus = await window.aistudio.hasSelectedApiKey();
                setHasApiKey(keyStatus);
            } else {
                setHasApiKey(false); // aistudio might not be available
            }
        };
        checkKey();
    }, []);
    
    useEffect(() => {
        let interval: number;
        if (isLoading) {
            let i = 0;
            interval = window.setInterval(() => {
                i = (i + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[i]);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            setHasApiKey(true); // Optimistically set to true
        }
    };

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError('Please provide a prompt to generate an image.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage(loadingMessages[0]);
        setError(null);
        setImageUrl(null);

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    imageSize,
                    aspectRatio
                })
            });

            const data = await response.json();

            if (!response.ok) {
                 if (data.error && data.error.includes('Requested entity was not found')) {
                    throw new Error("Your API key is invalid. Please select a valid key and try again.");
                }
                throw new Error(data.error || 'Failed to generate image.');
            }
            
            setImageUrl(`data:image/png;base64,${data.base64Image}`);
        } catch (err) {
            console.error(err);
            let message = "An unexpected error occurred during image generation.";
            if (err instanceof Error) {
                if (err.message.includes('Your API key is invalid')) {
                    message = err.message;
                    setHasApiKey(false); // Reset key state
                } else if (err.message.toLowerCase().includes('billing')) {
                    message = "Image generation with this model requires a paid Google Cloud project. Please select an API key from a project with billing enabled.";
                    setHasApiKey(false);
                } else {
                    message = err.message;
                }
            }
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (hasApiKey === null) {
        return <div className="py-10"></div>; // Render nothing while checking
    }
    
    return (
        <div className="mt-16">
            <div className="text-center mb-12">
                <PhotoIcon className="w-12 h-12 mx-auto text-brand-gold mb-4" />
                <h3 className="font-serif text-3xl font-bold text-brand-dark">Generate an Image with AI</h3>
                <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                    Bring your concepts to life. Describe an image related to the industry, and our AI will create it for you using Gemini.
                </p>
            </div>

            {hasApiKey === false && (
                <div className="text-center bg-brand-gold/10 p-8 rounded-lg max-w-3xl mx-auto">
                    <h3 className="font-serif text-2xl font-bold text-brand-dark mb-4">API Key Required</h3>
                    <p className="text-gray-700 mb-6">
                        This advanced image generation feature requires a paid Google Cloud project. Please select your API key to proceed.
                        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline ml-1">Learn more about billing.</a>
                    </p>
                    <button onClick={handleSelectKey} className="bg-brand-gold text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                        Select API Key
                    </button>
                </div>
            )}

            {hasApiKey && (
                 <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                       <div className="space-y-6">
                           <div>
                               <label htmlFor="prompt" className="block text-sm font-bold text-brand-dark mb-2">1. Describe the Image</label>
                               <textarea 
                                id="prompt" 
                                rows={4}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., A futuristic oil refinery under a starry night sky."
                                className="w-full p-3 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"
                               />
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-brand-dark mb-2">2. Choose Aspect Ratio</label>
                              <div className="flex gap-4 flex-wrap">
                                  {(['16:9', '1:1', '9:16'] as const).map(ratio => (
                                      <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`px-4 py-2 rounded-full font-semibold border-2 text-sm transition-colors ${aspectRatio === ratio ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-brand-dark border-gray-300'}`}>
                                        {ratio}
                                      </button>
                                  ))}
                              </div>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-brand-dark mb-2">3. Choose Image Size</label>
                              <div className="flex gap-4 flex-wrap">
                                  {(['1K', '2K', '4K'] as const).map(size => (
                                      <button key={size} onClick={() => setImageSize(size)} className={`px-4 py-2 rounded-full font-semibold border-2 text-sm transition-colors ${imageSize === size ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-brand-dark border-gray-300'}`}>
                                        {size}
                                      </button>
                                  ))}
                              </div>
                           </div>
                       </div>
                       <div className="flex flex-col items-center justify-between h-full">
                            <div className="w-full">
                                <h3 className="block text-sm font-bold text-brand-dark mb-2 text-center">Result</h3>
                                <div className={`relative w-full bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden ${aspectRatio === '16:9' ? 'aspect-video' : aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[9/16]'}`}>
                                    {imageUrl && !isLoading && (
                                        <img src={imageUrl} alt={prompt} className="w-full h-full object-contain" />
                                    )}
                                    {!imageUrl && !isLoading && (
                                        <p>Your image will appear here</p>
                                    )}
                                     {isLoading && (
                                        <div className="absolute inset-0 bg-brand-dark/90 flex flex-col items-center justify-center z-10 text-white text-center p-4">
                                            <div className="w-12 h-12 border-2 border-dashed rounded-full animate-spin border-brand-gold mb-3"></div>
                                            <p className="text-sm">{loadingMessage}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handleGenerateImage}
                                disabled={isLoading || !prompt.trim()}
                                className="w-full mt-6 bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <SparklesIcon className="w-5 h-5" />
                                {isLoading ? 'Generating...' : 'Generate Image'}
                            </button>
                       </div>
                    </div>
                    {error && <p className="text-red-500 text-center mt-6 bg-red-100 p-3 rounded-md border border-red-500">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
