
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

const ChatBubble = ({ message, isUser, timestamp, isTyping }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-1",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[85%] px-4 py-3 rounded-2xl shadow-md relative",
        isUser 
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md" 
          : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
      )}>
        {isTyping ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
            <p className={cn(
              "text-xs mt-1 opacity-70",
              isUser ? "text-white" : "text-gray-500"
            )}>
              {timestamp}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
