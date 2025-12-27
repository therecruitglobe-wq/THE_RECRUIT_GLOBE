
import React, { useState } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { fileToBase64 } from '../utils/imageUtils';
import ImageEditAutoIcon from './icons/ImageEditAutoIcon';
import PhotoIcon from './icons/PhotoIcon';
import SparklesIcon from './icons/SparklesIcon';
import XIcon from './icons/XIcon';

const ImageEditor: React.FC = () => {
    const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();
    const [editorRef, isEditorVisible] = useAnimateOnScroll<HTMLDivElement>();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
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
    
    const clearEditor = () => {
        setImageFile(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        setPrompt('');
        setError(null);
    };

    const handleSubmit = async () => {
        if (!imageFile || !prompt.trim()) {
            setError('Please upload an image and provide an editing prompt.');
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const base64Image = await fileToBase64(imageFile);
            
            const response = await fetch('/api/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64Image,
                    mimeType: imageFile.type,
                    prompt: prompt
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate image.');
            }

            const newImageUrl = `data:image/png;base64,${data.base64Image}`;
            setImagePreview(newImageUrl);

            // Convert new image back to a file for potential iterative edits
            const newFileBlob = await (await fetch(newImageUrl)).blob();
            const newFileName = imageFile.name.replace(/\.[^/.]+$/, "") + "_edited.png";
            setImageFile(new File([newFileBlob], newFileName, { type: 'image/png' }));
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="image-editor" className="py-20 bg-white overflow-hidden">
             <div className="container mx-auto px-6">
                <div ref={titleRef} className={`text-center mb-12 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <ImageEditAutoIcon className="w-12 h-12 mx-auto text-brand-gold mb-4" />
                    <h2 className="font-serif text-4xl font-bold">AI Image Editor</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Transform your images with a simple text prompt. Powered by Gemini, you can add filters, remove objects, and reimagine your photos.
                    </p>
                </div>
                <div 
                    ref={editorRef}
                    className={`max-w-5xl mx-auto bg-brand-light p-8 rounded-lg shadow-xl border-t-4 border-brand-gold transition-all duration-1000 ${isEditorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                     <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div onDragOver={handleDragOver} onDrop={handleDrop}>
                                <label className="block text-sm font-bold text-brand-dark mb-2">1. Upload Image</label>
                                <div className="relative w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer bg-gray-100">
                                    {imagePreview && !isLoading ? (
                                        <div className="text-center p-2">
                                            <p className="font-semibold text-brand-dark">Ready to Edit!</p>
                                            <p className="text-xs">{imageFile?.name}</p>
                                            <button onClick={clearEditor} className="mt-2 text-sm text-red-500 hover:underline">
                                                Start Over
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="image-upload" className="text-center cursor-pointer">
                                            <PhotoIcon className="w-12 h-12 mx-auto" />
                                            <p>Drag & drop or click to upload</p>
                                            <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e.target.files)} />
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="prompt" className="block text-sm font-bold text-brand-dark mb-2">2. Describe Your Edit</label>
                                <textarea 
                                 id="prompt" 
                                 rows={3}
                                 value={prompt}
                                 onChange={(e) => setPrompt(e.target.value)}
                                 placeholder="e.g., Add a retro filter, make the sky purple..."
                                 className="w-full p-3 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !imageFile || !prompt.trim()}
                                className="w-full bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <SparklesIcon className="w-5 h-5" />
                                {isLoading ? 'Generating...' : 'Apply Edit'}
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h3 className="block text-sm font-bold text-brand-dark mb-2 text-center">Result</h3>
                            <div className="relative w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center text-gray-400">
                                {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-md" />}
                                {!imagePreview && <p>Your image will appear here</p>}
                                {isLoading && (
                                    <div className="absolute inset-0 bg-brand-dark/80 flex flex-col items-center justify-center z-10 text-white text-center p-4 rounded-lg">
                                        <div className="w-12 h-12 border-2 border-dashed rounded-full animate-spin border-brand-gold mb-3"></div>
                                        <p className="text-sm">Applying AI magic...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                     </div>
                     {error && <p className="text-red-500 text-center mt-6 bg-red-100 p-3 rounded-md border border-red-500">{error}</p>}
                </div>
             </div>
        </section>
    );
};

export default ImageEditor;
