import React from 'react';
import { Message } from '../types';
import { User, Bot, Copy, CheckCircle } from 'lucide-react';
import DataTable from './DataTable';
import LoadingAnimation from './LoadingAnimation';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const isUser = message.type === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-4xl ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
            : 'bg-gradient-to-br from-gray-700 to-gray-900 text-white'
        }`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`relative group px-4 py-3 rounded-2xl shadow-lg ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md' 
              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
          }`}>
            {/* Copy button */}
            {!isUser && !message.isLoading && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-gray-100"
                title="Copy message"
              >
                {copied ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} className="text-gray-500" />
                )}
              </button>
            )}

            {message.isLoading ? (
              <LoadingAnimation />
            ) : message.error ? (
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-sm font-medium">Error:</span>
                <span className="text-sm">{message.error}</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed pr-6">{message.content}</p>
            )}
          </div>

          {/* Data Table */}
          {message.data && message.data.length > 0 && !message.isLoading && (
            <div className="mt-4 w-full max-w-4xl">
              <DataTable data={message.data} />
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;