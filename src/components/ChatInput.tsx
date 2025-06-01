
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Heart, Sparkles, Smile } from 'lucide-react';

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
    <div className="p-6 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 relative">
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      
      {/* Quick message buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickMessages.map((quickMsg, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => setMessage(quickMsg)}
            className="text-xs bg-gray-700/50 border-gray-600 hover:bg-gray-600/70 text-gray-300 hover:text-white transition-all duration-300 rounded-full backdrop-blur-sm"
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
            className="resize-none min-h-[50px] max-h-32 rounded-3xl border-2 border-gray-600 focus:border-purple-500 bg-gray-700/70 backdrop-blur-sm shadow-sm transition-all duration-300 text-sm text-gray-100 placeholder-gray-400"
            disabled={disabled}
          />
          {/* Character count */}
          <div className="absolute bottom-2 right-12 text-xs text-gray-500">
            {message.length}/500
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-12 w-12 rounded-full border-2 border-pink-500/50 hover:bg-pink-500/20 hover:border-pink-400 transition-all duration-300 hover:scale-105 bg-gray-700/50 backdrop-blur-sm"
            disabled={disabled}
          >
            <Heart className="h-4 w-4 text-pink-400" />
          </Button>
          
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            size="sm"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 disabled:opacity-50 transition-all duration-300 hover:scale-105 shadow-lg border border-purple-500/20"
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
