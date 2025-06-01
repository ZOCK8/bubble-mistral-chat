
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
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-5 shadow-2xl relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
              <Heart className="text-pink-200 h-6 w-6" fill="currentColor" />
            </div>
            {isOnline && (
              <>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </>
            )}
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide">{aiName}</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-white/90 font-medium">
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
            className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
