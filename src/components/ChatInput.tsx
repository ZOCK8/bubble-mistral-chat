
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Heart, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickMessages = [
    "Hallo Luna! 😊",
    "Wie geht es dir?",
    "Erzähl mir etwas Interessantes",
    "Ich möchte flirten 💕"
  ];

  return (
    <div className="p-6 bg-gradient-to-t from-purple-50 to-white border-t border-purple-200 relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
      
      {/* Quick message buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickMessages.map((quickMsg, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => setMessage(quickMsg)}
            className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 rounded-full"
            disabled={disabled}
          >
            {quickMsg}
          </Button>
        ))}
      </div>
      
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Schreibe Luna eine süße Nachricht... 💕"
            className="resize-none min-h-[50px] max-h-32 rounded-3xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 text-sm"
            disabled={disabled}
          />
          {/* Character count */}
          <div className="absolute bottom-2 right-12 text-xs text-gray-400">
            {message.length}/500
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-12 w-12 rounded-full border-2 border-pink-300 hover:bg-pink-50 transition-all duration-300 hover:scale-105"
            disabled={disabled}
          >
            <Heart className="h-4 w-4 text-pink-500" />
          </Button>
          
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            size="sm"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-50 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {disabled ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
