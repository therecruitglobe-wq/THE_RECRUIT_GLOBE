
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { fileToBase64 } from '../utils/imageUtils';
import PhotoIcon from './icons/PhotoIcon';
import SparklesIcon from './icons/SparklesIcon';
import XIcon from './icons/XIcon';

const loadingMessages = [
    "Warming up the digital canvas...",
    "Teaching pixels to dance...",
    "Composing a visual symphony...",
    "Assembling frames of your story...",
    "This can take a few minutes, the magic is worth it!",
    "Finalizing the cinematic masterpiece...",
];

const AnimateImage: React.FC = () => {
    const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio) {
                const keyStatus = await window.aistudio.hasSelectedApiKey();
                setHasApiKey(keyStatus);
            } else {
                setHasApiKey(false);
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
            // Optimistically assume key selection is successful to improve UX
            setHasApiKey(true);
        }
    };

    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setVideoUrl(null); // Reset video on new image
            setError(null);
        } else {
            setError('Please upload a valid image file (PNG, JPG, etc.).');
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files);
    };
    
    const removeImage = () => {
        setImageFile(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
    }

    const handleGenerateVideo = async () => {
        if (!imageFile || !prompt.trim()) {
            setError('Please upload an image and provide a prompt.');
            return;
        }
        setIsLoading(true);
        setLoadingMessage(loadingMessages[0]);
        setError(null);
        setVideoUrl(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64Data = await fileToBase64(imageFile);

            let operation = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                prompt: prompt,
                image: {
                    imageBytes: base64Data,
                    mimeType: imageFile.type,
                },
                config: {
                    numberOfVideos: 1,
                    resolution: '720p',
                    aspectRatio: aspectRatio
                }
            });

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
            }
            
            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                 const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                 const videoBlob = await response.blob();
                 setVideoUrl(URL.createObjectURL(videoBlob));
            } else {
                throw new Error("Video generation completed, but no download link was provided.");
            }

        } catch (err) {
            console.error(err);
            let message = "An unexpected error occurred during video generation.";
            if (err instanceof Error) {
                if (err.message.includes('Requested entity was not found')) {
                    message = "Your API key is invalid. Please select a valid key and try again.";
                    setHasApiKey(false); // Reset key state
                } else if (err.message.toLowerCase().includes('billing')) {
                    message = "Video generation requires a paid Google Cloud project. Please select an API key from a project with billing enabled.";
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
        return <section className="py-20 bg-white"></section>; // Render nothing while checking
    }

    return (
        <section id="animate" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl font-bold">Animate Your Vision</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Bring your ideas to life. Upload an image, describe a scene, and watch our AI create a stunning video for you.
                    </p>
                </div>

                {isLoading && (
                    <div className="fixed inset-0 bg-brand-dark/80 flex flex-col items-center justify-center z-50 text-white text-center p-4">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-gold mb-4"></div>
                        <p className="font-serif text-2xl mb-2">Generating Your Video</p>
                        <p className="text-lg">{loadingMessage}</p>
                    </div>
                )}
                
                {hasApiKey === false && (
                    <div className="text-center bg-brand-gold/10 p-8 rounded-lg">
                        <h3 className="font-serif text-2xl font-bold text-brand-dark mb-4">API Key Required</h3>
                        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                            This feature uses Google's Veo for video generation, which requires a paid Google Cloud project. Please select your API key to proceed.
                            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline ml-1">Learn more about billing.</a>
                        </p>
                        <button onClick={handleSelectKey} className="bg-brand-gold text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                            Select API Key
                        </button>
                    </div>
                )}

                {hasApiKey && (
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                           <div className="space-y-6">
                               <div onDragOver={handleDragOver} onDrop={handleDrop}>
                                    <label htmlFor="image-upload" className="block text-sm font-bold text-brand-dark mb-2">1. Upload Your Image</label>
                                    <div className="relative w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer bg-gray-50">
                                        {imagePreview ? (
                                           <>
                                             <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-md" />
                                             <button onClick={removeImage} className="absolute top-2 right-2 bg-white/70 rounded-full p-1 text-brand-dark hover:bg-white" aria-label="Remove image">
                                                 <XIcon className="w-5 h-5"/>
                                             </button>
                                           </>
                                        ) : (
                                            <div className="text-center">
                                                <PhotoIcon className="w-12 h-12 mx-auto" />
                                                <p>Drag & drop or click to upload</p>
                                                <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e.target.files)} />
                                            </div>
                                        )}
                                    </div>
                               </div>

                               <div>
                                   <label htmlFor="prompt" className="block text-sm font-bold text-brand-dark mb-2">2. Describe the Animation</label>
                                   <textarea 
                                    id="prompt" 
                                    rows={4}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g., A gentle breeze rustles the leaves, cinematic lighting."
                                    className="w-full p-3 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"
                                   />
                               </div>
                               <div>
                                  <label className="block text-sm font-bold text-brand-dark mb-2">3. Choose Aspect Ratio</label>
                                  <div className="flex gap-4">
                                      {(['16:9', '9:16'] as const).map(ratio => (
                                          <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`px-4 py-2 rounded-full font-semibold border-2 transition-colors ${aspectRatio === ratio ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-brand-dark border-gray-300'}`}>
                                            {ratio} ({ratio === '16:9' ? 'Landscape' : 'Portrait'})
                                          </button>
                                      ))}
                                  </div>
                               </div>
                           </div>
                           <div className="flex flex-col items-center justify-between h-full">
                                <div className="w-full">
                                    <h3 className="block text-sm font-bold text-brand-dark mb-2 text-center">4. Generate Your Video</h3>
                                    <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                                        {videoUrl ? (
                                            <video src={videoUrl} controls autoPlay loop className="w-full h-full rounded-lg" />
                                        ) : (
                                            <p className="text-gray-400">Your video will appear here</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={handleGenerateVideo}
                                    disabled={isLoading || !imageFile || !prompt.trim()}
                                    className="w-full mt-6 bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <SparklesIcon className="w-5 h-5" />
                                    Animate
                                </button>
                           </div>
                        </div>
                        {error && <p className="text-red-500 text-center mt-6">{error}</p>}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AnimateImage;
