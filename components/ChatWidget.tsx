
import React, { useState, useEffect, useRef } from 'react';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import XIcon from './icons/XIcon';
import InterviewIcon from './icons/InterviewIcon';

interface MessageSource {
  uri: string;
  title?: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: MessageSource[];
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I'm the AI assistant for The Recruit Globe. I can search the web for the latest job market info. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
        setMessages((prev) => [...prev, { role: 'model', text: '', sources: [] }]);
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: newMessages }),
        });

        if (!response.ok || !response.body) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n\n').filter(line => line.startsWith('data: '));

            for (const line of lines) {
                const jsonStr = line.replace('data: ', '');
                try {
                    const parsed = JSON.parse(jsonStr);
                    setMessages(prev => {
                        const updatedMessages = [...prev];
                        const lastMessage = updatedMessages[updatedMessages.length - 1];
                        if (lastMessage.role === 'model') {
                            lastMessage.text += parsed.text || '';
                            if (parsed.sources) {
                                const existingUris = new Set(lastMessage.sources?.map(s => s.uri));
                                parsed.sources.forEach((source: MessageSource) => {
                                    if (source.uri && !existingUris.has(source.uri)) {
                                       lastMessage.sources?.push({ uri: source.uri, title: source.title || source.uri });
                                    }
                                });
                            }
                        }
                        return updatedMessages;
                    });
                } catch (e) {
                    console.error("Failed to parse stream chunk:", jsonStr, e);
                }
            }
        }

    } catch (error) {
      console.error("Error sending message:", error);
      let errorMessage = "I'm sorry, but I'm unable to respond at the moment. Please try again later.";
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('fetch')) {
          errorMessage = "A network error occurred. Please check your internet connection and try again.";
        }
      }
      setMessages((prev) => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-0 right-0 m-6 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-gold text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transform hover:scale-110 transition-transform"
          aria-label="Open chat"
        >
          <ChatBubbleIcon className="w-8 h-8" />
        </button>
      </div>

      <div
        className={`fixed bottom-0 right-0 m-6 bg-brand-light shadow-2xl rounded-lg w-[calc(100%-3rem)] max-w-md h-[70vh] flex flex-col transition-all duration-300 ease-in-out origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <header className="bg-brand-dark text-white p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center space-x-2">
            <InterviewIcon className="w-6 h-6 text-brand-gold" />
            <h3 className="font-serif text-lg font-bold">Chat with our AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">
            <XIcon className="w-6 h-6 hover:text-brand-gold" />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs md:max-w-sm p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-gold text-white' : 'bg-gray-200 text-brand-dark'}`}
                >
                  <p className="text-sm" style={{ whiteSpace: 'pre-wrap'}}>{msg.text}</p>
                   {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-300/50">
                      <h4 className="text-xs font-bold mb-1 text-gray-600">Sources:</h4>
                      <ul className="space-y-1">
                        {msg.sources.map((source, idx) => (
                          <li key={idx} className="truncate">
                            <a 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-blue-600 hover:underline"
                              title={source.title}
                            >
                              {idx + 1}. {source.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
             {isLoading && messages[messages.length - 1]?.role !== 'model' && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-brand-dark p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 bg-transparent rounded-full focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-brand-gold text-white rounded-full w-10 h-10 m-1 flex items-center justify-center disabled:bg-gray-400"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
