
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  onSettingsClick: () => void;
  aiName: string;
  isOnline: boolean;
}

const ChatHeader = ({ onSettingsClick, aiName, isOnline }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
              <span className="text-lg font-bold">AI</span>
            </div>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h1 className="font-semibold text-lg">{aiName}</h1>
            <p className="text-sm opacity-90">
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
            className="text-white hover:bg-white/20"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
