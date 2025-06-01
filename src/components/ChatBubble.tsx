
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, Sparkles } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

const ChatBubble = ({ message, isUser, timestamp, isTyping }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full mb-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500",
      isUser ? "justify-end" : "justify-start"
    )}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] relative group",
        isUser ? "order-1" : "order-2"
      )}>
        <div className={cn(
          "px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm relative overflow-hidden",
          isUser 
            ? "bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 text-white rounded-br-lg" 
            : "bg-white/90 border border-purple-200 text-gray-800 rounded-bl-lg"
        )}>
          {/* Decorative elements for AI messages */}
          {!isUser && (
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50 -translate-y-8 translate-x-8"></div>
          )}
          
          {/* Sparkle effect for user messages */}
          {isUser && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          
          {isTyping ? (
            <div className="flex space-x-2 items-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-purple-600 ml-2">Luna tippt...</span>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed whitespace-pre-wrap relative z-10">{message}</p>
              <div className="flex items-center justify-between mt-3">
                <p className={cn(
                  "text-xs opacity-70 relative z-10",
                  isUser ? "text-white/80" : "text-gray-500"
                )}>
                  {timestamp}
                </p>
                {!isUser && (
                  <Heart className="w-3 h-3 text-pink-400 opacity-70" />
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Message tail */}
        <div className={cn(
          "absolute top-4 w-0 h-0",
          isUser 
            ? "right-0 border-l-[12px] border-l-blue-500 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent translate-x-1"
            : "left-0 border-r-[12px] border-r-white/90 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent -translate-x-1"
        )}></div>
      </div>
      
      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold text-sm">Du</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
