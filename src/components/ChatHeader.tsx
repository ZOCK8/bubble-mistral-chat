
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, MoreVertical, Heart } from 'lucide-react';

interface ChatHeaderProps {
  onSettingsClick: () => void;
  aiName: string;
  isOnline: boolean;
}

const ChatHeader = ({ onSettingsClick, aiName, isOnline }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white p-5 shadow-2xl relative overflow-hidden border-b border-gray-700">
      {/* Subtle dark decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 backdrop-blur-sm flex items-center justify-center border border-gray-600 shadow-lg">
              <Heart className="text-pink-200 h-6 w-6" fill="currentColor" />
            </div>
            {isOnline && (
              <>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 shadow-sm"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </>
            )}
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide text-gray-100">{aiName}</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-300 font-medium">
                {isOnline ? 'Online & bereit für dich 💕' : 'Offline'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
            className="text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl transition-all duration-300 hover:scale-105 hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl transition-all duration-300 hover:scale-105 hover:text-white"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
