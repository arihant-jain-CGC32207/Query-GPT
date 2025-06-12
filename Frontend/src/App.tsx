import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { queryGPTAPI } from './services/api';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import { Brain, AlertCircle } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      content,
      type: 'user',
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: generateId(),
      content: 'Processing your query...',
      type: 'bot',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const response = await queryGPTAPI.processPrompt(content);
      
      const botMessage: Message = {
        id: generateId(),
        content: `Found ${response.result?.length || 0} records matching your query.`,
        type: 'bot',
        timestamp: new Date(),
        data: response.result,
      };

      setMessages(prev => prev.slice(0, -1).concat(botMessage));
    } catch (error: any) {
      const errorMessage: Message = {
        id: generateId(),
        content: 'Sorry, there was an error processing your request.',
        type: 'bot',
        timestamp: new Date(),
        error: error.response?.data?.detail || error.message || 'Unknown error occurred',
      };

      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">QueryGPT</h1>
            <p className="text-sm text-gray-600">Natural Language Database Queries</p>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="max-w-4xl mx-auto p-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Status Bar */}
      {isLoading && (
        <div className="bg-blue-50 border-t border-blue-200 px-6 py-2">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-blue-700">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">AI is analyzing your query...</span>
          </div>
        </div>
      )}

      {/* Connection Status */}
      <div className="bg-gray-100 px-6 py-2 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Connected to QueryGPT Backend (localhost:8000)
          </p>
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}

export default App;